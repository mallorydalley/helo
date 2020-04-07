module.exports = {
    getAllPosts: (req, res) => {
        const {userposts, search} = req.query
        const {user_id} = req.session;
        const db = req.app.get('db')

        db.posts.get_all_posts(+user_id)
            .then(result => res.status(200).send(result))
            .catch(err => {
                res.status(500).send('Oops! Failed to retrieve posts.')
                console.log(err)
            })

        // db.posts.get_all_posts(user_id)
        // .then(posts => {
        //     if(userposts === true && search !== ''){
        //         return res.status(200).send(posts.includes(search))
        //     }
        //     if (userposts === false && search === '') {
        //         return res.status(200).send(posts)
        //     }
        //     if (userposts === false && search !== ''){
        //         return res.status(200).send(posts)  ///this needs to be changed
        //     }
        //     if (userposts === true && search === ''){
        //         return res.status(200).send(posts)
        //     }
        // })
        //     .catch(err => {
        //         res.status(500).send(`Oops! Fetch posts failed.`)
        //         console.log(err)
        //     })
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