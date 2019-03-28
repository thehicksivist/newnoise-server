const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const users = require('./users')
const posts = require('./posts')
const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
    extended: true,
    })
)

app.use('/', cors());

app.get('/', (request, response) => {
    response.json({ users: [{name: 'bob', email: 'bobjohnson@gmail.com'}, {name: 'sam', email: 'samwise@gmail.com'}] })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

// below is the crud functions and routes for users queries
app.get('/users', users.getUsers)
app.get('/users/:id', users.getUserById)
app.post('/users', users.createUser)
app.put('/users/:id', users.updateUser)
app.delete('/users/:id', users.deleteUser)

// as above for posts
app.get('/posts', posts.getPosts)
app.get('/posts/:id', posts.getPostById)
app.post('/posts', posts.createPost)
app.put('/posts/:id', posts.updatePost)
app.delete('/posts/:id', posts.deletePost)
