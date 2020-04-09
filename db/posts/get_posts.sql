select up.title, u.user_id, u.username, u.profile_pic from users u
join user_posts up on u.user_id = up.user_id;