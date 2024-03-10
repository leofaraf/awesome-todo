use std::{sync::{Arc, Mutex}, time::Instant};

use actix_web::{get, web::{self, Json}, HttpResponse, post};
use log::info;

use crate::{postgres::PostgresPool, models::user::{User, NewUserRequest, NewUser}, AppState, email};
use diesel::{prelude::*, associations::HasTable};

pub mod verify_email;

#[get("/api/users")] 
async fn users(
    pool: web::Data<PostgresPool>,
) -> HttpResponse {
    use crate::schema::users::dsl::*;

    let result = web::block(move || {
        let mut connection = pool.get()
            .expect("couldn't get db connection from pool");

        users
            .limit(5)
            .select(User::as_select())
            .load(&mut connection)
            .expect("Error loading posts")
    }).await.unwrap();

    HttpResponse::Ok().json(result)
}

#[post("/api/login")]
async fn login() -> HttpResponse {
    HttpResponse::Ok().finish()
}

#[post("/api/registration")] 
async fn registration(
    payload: Json<NewUserRequest>,
    pool: web::Data<PostgresPool>,
    data: web::Data<Arc<Mutex<AppState>>>
) -> HttpResponse {

    let a = Instant::now();
    let state = data.lock().unwrap();
    
    if let Some(code) = state.user_codes.get(&payload.email) {
        if &payload.code == code {
            let usr = NewUser::from(payload.0);
            let b = Instant::now();
            use crate::schema::users::dsl::*;
            let mut connection = pool.get()
                .expect("couldn't get db connection from pool");

            let check_email: Vec<User> = users
                .limit(1)
                .filter(email.eq(email))
                .load(&mut connection)
                .expect("Error loading posts");
            
            if check_email.len() == 1 {
                HttpResponse::BadRequest().finish()
            } else {
                let mut connection = pool.get()
                    .expect("couldn't get db connection from pool");
                diesel::insert_into(users::table())
                    .values(&usr)
                    .execute(&mut connection)
                    .expect("Error inserting post");
                HttpResponse::Ok().finish()
            }
        } else {
            HttpResponse::BadRequest().finish()
        }
    } else {
        HttpResponse::BadRequest().finish()
    }
}