use diesel::prelude::*;
use serde::Serialize;
use crate::schema::users;

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct User {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub first_name: String,
    pub second_name: String,
    pub pwhash: String,
}

#[derive(Insertable)]
#[diesel(table_name = users)]
pub struct NewUser {
    pub username: String,
    pub email: String,
    pub first_name: String,
    pub second_name: String,
    pub pwhash: String,
}