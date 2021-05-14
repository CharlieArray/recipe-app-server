DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_name TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL
);

DROP TABLE IF EXISTS shoppinglist;

CREATE TABLE shoppinglist(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    item TEXT,
    users_id INT REFERENCES users(id)
);