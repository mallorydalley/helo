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
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
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
app.post(`/auth/logout`, ctrl.logout)
app.get(`/api/auth/me`, ctrl.me)

//post endpoints
// app.get(`/api/all-posts`, postCtrl.getAllPosts)  //WORKING W/O QUERIES
    // /? userposts =: userposts & search=: search
app.get(`/api/all-posts`, postCtrl.getAllPosts)
app.get(`/api/post/:post_id`, postCtrl.getOnePost)  
app.post(`/api/post`, postCtrl.createPost) 
app.delete(`/api/post/:post_id`, postCtrl.deletePost) 




app.listen(port, () => console.log(`Server running on ${port}`));