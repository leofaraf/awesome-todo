use std::{time::SystemTime, env};

use actix_web::{middleware::{self, Logger}, web::{self, Json}, App, Error, HttpRequest, HttpResponse, HttpServer, post, get, dev::{ServiceRequest, Service}};
use diesel::{prelude::*, associations::HasTable};
use futures_util::FutureExt;
use log::info;
use crate::postgres::PostgresPool;

use self::models::*;

mod models;
mod schema;
mod postgres;
mod hasher;

#[get("/api/users")] 
async fn users(
    pool: web::Data<PostgresPool>,
) -> HttpResponse {
    use self::schema::users::dsl::*;

    let result = web::block(move || {
        let mut connection = pool.get()
            .expect("couldn't get db connection from pool");

        users
            .limit(5)
            .select(User::as_select())
            .load(&mut connection)
            .expect("Error loading posts")
    }).await.unwrap();

    info!("returning");
    HttpResponse::Ok().json(result)
}

#[post("/api/registration")] 
async fn registration(
    payload: Json<NewUserRequest>,
    pool: web::Data<PostgresPool>,
) -> HttpResponse {
    use self::schema::users::dsl::*;

    web::block(move || {
        let mut connection = pool.get()
            .expect("couldn't get db connection from pool");
        let new_user = NewUser { 
            username: payload.username.to_owned(),
            email: payload.email.to_owned(),
            first_name: payload.first_name.to_owned(),
            second_name: payload.second_name.to_owned(),
            pwhash: hasher::hash(payload.password.to_owned())
        };

        diesel::insert_into(users)
            .values(new_user)
            .execute(&mut connection)
            .expect("Error inserting post: {}", )
    }).await.unwrap();

    HttpResponse::Ok().finish()
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    info!("starting HTTP server at http://localhost:8080");

    let pool = postgres::get_pool();
    HttpServer::new(move || App::new()
        .app_data(web::Data::new(pool.clone()))
        .wrap(Logger::new("%a %{User-Agent}i"))
        .wrap_fn(|req, srv| {
            println!("Hi from start. You requested: {}", req.path());
            srv.call(req)
        })
        .service(users)
        .service(registration)
    )
        .bind(("0.0.0.0", 8080))?
        .run()
        .await
}