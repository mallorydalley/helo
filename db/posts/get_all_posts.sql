select up.post_id, up.title, up.img, up.content, u.user_id, u.username, u.profile_pic from users u
join user_posts up on u.user_id = up.user_id;


