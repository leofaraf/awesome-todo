use diesel::{Queryable, Selectable, Insertable};
use serde::{Serialize, Deserialize};

use crate::{schema::users, hasher};

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct User {
    pub id: i32,
    pub email: String,
    pub first_name: String,
    pub second_name: String,
    pub pwhash: String,
}

#[derive(Insertable)]
#[diesel(table_name = users)]
pub struct NewUser {
    pub email: String,
    pub first_name: String,
    pub second_name: String,
    pub pwhash: String,
}

impl From<NewUserRequest> for NewUser {
    fn from(value: NewUserRequest) -> Self {
        value.to_new_user()
    }
}

#[derive(Deserialize, Serialize)]
pub struct NewUserRequest {
    pub email: String,
    pub first_name: String,
    pub second_name: String,
    pub password: String,
    pub code: String,
}

impl NewUserRequest {
    pub fn to_new_user(self) -> NewUser {
        NewUser {
            email: self.email,
            first_name: self.first_name,
            second_name: self.second_name,
            pwhash: hasher::hash(self.password)
        }
    }
}