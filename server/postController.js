module.exports = {
    getAllPosts: async (req, res) => {
        const {userposts, search} = req.query
        const {user_id} = req.session;
        const db = req.app.get('db')

        //Userposts is TRUE and there IS a search
        if (userposts === 'true' && search !== '' ){
            let getPosts = await db.posts.get_all_posts();
            let filterPost = getPosts.filter(post => post.title.includes(search))
            return res.status(200).send(filterPost)
        }
        //Userposts is FALSE and NO search 
        if(userposts === 'false' && search === ''){
            let getPosts = await db.posts.get_all_posts();
            let filterPost = getPosts.filter(post => (post.user_id !== user_id)? post : null)
            return res.status(200).send(filterPost)
        }
        //Userposts is FALSE and there IS a search
        if(userposts === 'false' && search !== ''){
            let getPosts = await db.posts.get_all_posts();
            let notMyPost = getPosts.filter(post => (post.user_id !== user_id)? post : null);
            let filterPost = notMyPost.filter(post => post.title.includes(search));
            return res.status(200).send(filterPost)
        }

        //Userposts is TRUE and there is NO search WORKING
        if (userposts === 'true' && search === '') {
            let getPosts = await db.posts.get_all_posts()
            return res.status(200).send(getPosts)
        }
    },
    getOnePost: (req, res) => {
        const {post_id} = req.params 
        const db = req.app.get('db')

        db.posts.get_one_post(post_id)
            .then(post => res.status(200).send(post))
            .catch(err => {
                res.status(500).send(`Oops! Couldn't get that post.`)
                console.log(err)
            })
    },
    createPost: (req, res) => {
        const {user_id} = req.session;
        const {title, img, content} = req.body
        const db = req.app.get('db')

        db.posts.create_post({user_id, title, img, content})
        .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send(`Oops! Post couldn't be created.`)
                console.log(err)
            })
    },
    deletePost: (req, res) => {
        const {post_id} = req.params;
        const db = req.app.get('db')

        db.posts.delete_post(post_id)
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            res.status(500).send(`Oops! Failed to delete.`)
            console.log(err)
        })
    }
}