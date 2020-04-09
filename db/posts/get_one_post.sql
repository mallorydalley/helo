select up.title, up.img, up.content, u.username, u.profile_pic, u.user_id from users u
join user_posts up on u.user_id = up.user_id
where up.post_id = $1;