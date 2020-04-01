require('dotenv').config();
const express = require('express'),
    massive = require('massive'),
    session = require('express-session'),
    { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
    ctrl = require('./controller.js'),
    postCtrl = require(`./postController`),
    port = SERVER_PORT,
    app = express();

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie:{maxAge: 100 * 60 * 60}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('DB connected')
})

//authentication endpoints
app.post(`/auth/register`, ctrl.register)
app.post(`/auth/login`, ctrl.login)
app.get(`/auth/logout`, ctrl.logout)

//post endpoints
app.get(`/api/all-posts/:id/?userposts=:userposts&search=:search`, postCtrl.getAllPosts)
app.get(`/api/post/:post_id`, postCtrl.getOnePost)


app.listen(port, () => console.log(`Server running on ${port}`));