-- Your SQL goes here
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  second_name VARCHAR NOT NULL,
  pwhash VARCHAR NOT NULL
)