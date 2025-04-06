-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     first_name VARCHAR(255) NOT NULL,
--     last_name VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     hasedPassword VARCHAR(255) NOT NULL,
--     salt VARCHAR(255) NOT NULL
-- );

CREATE TABLE users1 (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);