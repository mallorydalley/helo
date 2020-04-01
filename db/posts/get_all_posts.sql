-- select up.post_id, up.post from user_posts up
-- join users u on up.user_id = u.user_id
-- where u.user = $1;

--selects all info from each author and all their posts

select * from users
join user_posts on users.user_id = user_posts.user_id
