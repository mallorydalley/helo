create table users (
    user_id serial primary key,
    password varchar(250),
    username varchar(30),
    profile_pic text
);

create table user_posts (
    post_id serial primary key,
    user_id int references users(user_id),
    title varchar(45),
    img text,
    content text
);