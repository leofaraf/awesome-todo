// @generated automatically by Diesel CLI.

diesel::table! {
    users (id) {
        id -> Int4,
        email -> Varchar,
        first_name -> Varchar,
        second_name -> Varchar,
        pwhash -> Varchar,
    }
}
