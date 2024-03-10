use std::sync::{Arc, Mutex};

use actix_web::{get, web, HttpResponse};
use rand::Rng;

use crate::{AppState, email};

#[get("/api/verify-email/{email}")]
async fn verify_email(
    email: web::Path<(String,)>,
    data: web::Data<Arc<Mutex<AppState>>>
) -> HttpResponse {
    let mut state = data.lock().unwrap();

    let email = email.into_inner().0;
    let code = generate_code();

    state.user_codes.insert(email.clone(), code.clone());
    email::send_email(email, format!("Verification code: {code}"), "Verification Code".into());
    HttpResponse::Ok().finish()
}

fn generate_code() -> String {
    let mut rng = rand::thread_rng();
    let random_number: u16 = rng.gen_range(0..10000);
    format!("{:04}", random_number)
}