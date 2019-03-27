const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./queries')
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

// below is the crud functions and routes for db queries
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
