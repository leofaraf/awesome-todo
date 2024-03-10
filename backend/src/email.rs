use std::{env, time::SystemTime};

use lettre::{Message, transport::smtp::authentication::{Credentials, Mechanism}, SmtpTransport, Transport};
use log::info;

pub fn send_email(target_address: String, body: String, subject: String) {
    let smtp_relay = env::var("SMTP_RELAY").unwrap();
    let smtp_address = env::var("SMTP_USERNAME").unwrap();
    let smtp_password = env::var("SMTP_PASSWORD").unwrap();

    let email = Message::builder()
        .from(smtp_address.parse().unwrap())
        .to(target_address.parse().unwrap())
        .subject(subject)
        .body(body)
        .unwrap();

    let creds = Credentials::new(
        smtp_address,
        smtp_password
    );
    let mailer = SmtpTransport::relay(smtp_relay.as_str())
        .unwrap()
        .credentials(creds)
        .build();

    match mailer.send(&email) {
        Ok(_) => println!("Email sent successfully!"),
        Err(e) => println!("Failed to send email: {:?}", e),
    }
}
