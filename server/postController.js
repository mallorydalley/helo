module.exports = {
    getAllPosts: (req, res) => {
        const {userposts, search} = req.query
        const {id} = req.params;
        const db = req.app.get('db')

        db.posts.get_all_posts(+id)
        .then(posts => {
            if(userposts === true && search !== ''){
                return res.status(200).send(posts.includes(search))
            }
            if (userposts === false && search === '') {
                return res.status(200).send(posts)
            }
            if (userposts === false && search !== ''){
                return res.status(200).send(posts)  ///this needs to be changed
            }
            if (userposts === true && search === ''){
                return res.status(200).send(posts)
            }
        })
        .catch(err => res.status(500).send(err))
    },
    getOnePost: (req, res) => {
        const {post_id} = req.params
        const db = req.app.get('db')

        db.posts.get_one_post(+post_id)
        .then(post => res.status(200).send(post))
        .catch(err => console.log(err))
    }
}