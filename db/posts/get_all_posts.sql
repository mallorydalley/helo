-- select up.post_id, up.post from user_posts up
-- join users u on up.user_id = u.user_id
-- where u.user = $1;

--selects all info from each author and all their posts

select up.user_posts, up.title, up.img, up.content, u.user_id, u.username, u.profile_pic from users u
join user_posts up on u.user_id = up.user_id


--don't want password

-- select * from users
-- join user_posts on users.user_id = user_posts.user_id
