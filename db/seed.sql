create table users (
    user_id serial primary key,
    email varchar(150),
    password varchar(250),
    username varchar(30)
);

create table user_posts (
    post_id serial primary key,
    user_id int references users(user_id),
    post text
);