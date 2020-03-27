insert into users (
    password,
    username
) values (
    ${password},
    ${username}
)

returning user_id, username;