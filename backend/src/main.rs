use std::{time::SystemTime, env, collections::HashMap, sync::{Arc, Mutex}};

use actix_web::{middleware::{self, Logger}, web::{self, Json}, App, Error, HttpRequest, HttpResponse, HttpServer, post, get, dev::{ServiceRequest, Service}};
use diesel::prelude::*;
use routes::verify_email::verify_email;
use crate::{postgres::PostgresPool, models::user::{User, NewUser, NewUserRequest}};
use crate::routes::*;

mod schema;
mod postgres;
mod hasher;
mod email;
mod models;
mod generator;
mod routes;

struct AppState {
    user_codes: HashMap<String, String>
}

#[actix_web::main]
async fn main() -> Result<(), std::io::Error> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    let pool = postgres::get_pool();
    let app_state = Arc::new(Mutex::new(AppState {
        user_codes: HashMap::new(),
    }));

    HttpServer::new(move || App::new()
        .app_data(web::Data::new(pool.clone()))
        .app_data(web::Data::new(app_state.clone()))
        .wrap(Logger::new("%a %{User-Agent}i"))
        .wrap_fn(|req, srv| {
            println!("Hi from start. You requested: {}", req.path());
            srv.call(req)
        })
        .service(users)
        .service(registration)
        .service(verify_email)
    )
        .bind(("0.0.0.0", 8080))?
        .run()
        .await
}