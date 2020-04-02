delete from user_posts
where post_id = $1;

select * from user_posts;