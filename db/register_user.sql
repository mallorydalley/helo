insert into users (
    password,
    username,
    profile_pic
) values (
    ${password},
    ${username},
    ${profile_pic}
)
returning user_id, username, profile_pic;



-- https://robohash.org/robo?set=set4