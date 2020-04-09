const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const {password, username} = req.body
        const profile_pic = 'https://robohash.org/9?set=set4'
        const db = req.app.get('db');

        let user = await db.check_user(username);
        if (user[0]) {
            return res.status(400).send("User already exists");
        }

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        let newUser = await db.register_user({ password:hash, username, profile_pic })
        req.session.user = newUser[0];
        req.session.user_id = newUser[0].user_id
        res.status(201).send(req.session.user);
        console.log(req.session.user)
        console.log(req.session.user.profile_pic)
    },
    login: async (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db');

        let user = await db.check_user(username);
        if(!user[0]){
            return res.status(400).send("User doesn't exist")
        }

        const authenticated = bcrypt.compareSync(password, user[0].password)
        if(!authenticated){
            return res.status(401).send('Password is incorrect')
        }
        delete user[0].password;
        req.session.user = user[0]
        req.session.user_id = user[0].user_id
        res.status(202).send(req.session.user)
        // console.log(req.session.user_id)
        // console.log(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    me: async (req, res) => {
        const { user_id } = req.session;
        const db = req.app.get('db')

        await db.retrieve_me({user_id})
        .then(user => res.status(200).send(user))
        .catch(err => {
            res.status(500).send('Failed to retrieve user.')
            console.log(err)
        })
    }
}