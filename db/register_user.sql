insert into users (
    password,
    username 
    -- profile_pic
) values (
    ${password},
    ${username}
    -- `https://robohash.org/robo?set=set4`
)

returning user_id, username, profile_pic;