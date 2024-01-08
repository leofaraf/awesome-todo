use std::{time::SystemTime, env};

use actix_web::{middleware::{self, Logger}, web, App, Error, HttpRequest, HttpResponse, HttpServer, post, get, dev::{ServiceRequest, Service}};
use diesel::{prelude::*, associations::HasTable};
use futures_util::FutureExt;
use log::info;
use crate::postgres::PostgresPool;

use self::models::*;

mod models;
mod schema;
mod postgres;

fn establish_connection() -> PgConnection {
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

fn is_authorized(cookie_value: &str) -> bool {
    // Authorization logic here
    true
}

#[get("/api/users")] 
async fn users(
    pool: web::Data<PostgresPool>,
) -> HttpResponse {
    use self::schema::users::dsl::*;

    let result = web::block(move || {
        let mut connection = pool.get().expect("couldn't get db connection from pool");

        users
            .limit(5)
            .select(User::as_select())
            .load(&mut connection)
            .expect("Error loading posts")
    }).await.unwrap();

    info!("returning");
    HttpResponse::Ok().json(result)
}

#[post("/api/user")] 
async fn post() -> HttpResponse {
    let connection = &mut establish_connection();
    use self::schema::users::dsl::*;

    let new_user = NewUser {
        username: "".into(),
        email: "".into(),
        first_name: "".into(),
        second_name: "".into(),
        pwhash: "".into()
    };

    let user = diesel::insert_into(users::table())
        .values(&new_user)
        .returning(User::as_returning())
        .get_result(connection)
        .expect("Error saving new post");

    HttpResponse::Ok().json(user)
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
        .service(post)
    )
        .bind(("0.0.0.0", 8080))?
        .run()
        .await
}