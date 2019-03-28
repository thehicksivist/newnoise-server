const Pool = require('pg').Pool

const pool = new Pool({
  user: 'james',
  host: 'localhost',
  database: 'newnoise',
  password: 'postgres',
  port: 5432,
})

const getPosts = (request, response) => {
    pool.query('SELECT * FROM posts ORDER BY id ASC', (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPostById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM posts WHERE id = $1', [id], (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}

const createPost = (request, response) => {
    const { title, image, text } = request.body

    pool.query("INSERT INTO posts (title, image, text) VALUES ($1, $2, $3) RETURNING *", [title, image, text], (error, results) => {
        if (error) {
        throw error
        }
        response.status(201).send(`Post added with ID: ${JSON.stringify(results.rows[0].id)}`)
    })
}

const updatePost = (request, response) => {
    const id = parseInt(request.params.id)
    const { title, image, text } = request.body

    pool.query(
        'UPDATE posts SET title = $1, image = $2, text = $3 WHERE id = $4',
        [title, image, text, id],
        (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Post modified with ID: ${id}`)
        }
    )
}

const deletePost = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM posts WHERE id = $1', [id], (error, results) => {
        if (error) {
        console.log(`Could not delete post with ID: ${id}:`, error)
        throw error
        }
        response.status(200).send(`Post deleted with ID: ${id}`)
    })
}


module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
}
