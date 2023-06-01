const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) {
        console.error('MySQL 데이터베이스 연결 실패:', err);
        return;
    }
    console.log('MySQL 데이터베이스에 성공적으로 연결되었습니다.');
});

const getAllPosts = (req, res) => {
    const query = 'SELECT * FROM posts';
    connection.query(query, (err, rows) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).json({ error: 'Error executing query' });
        } else {
            res.json(rows);
        }
    });
};

const getPostById = (req, res) => {
    const postId = req.params.id;
    const query = 'SELECT * FROM posts WHERE id = ?';
    connection.query(query, [postId], (err, rows) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).json({ error: 'Error executing query' });
        } else if (rows.length === 0) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            res.json(rows[0]);
        }
    });
};

const createPost = (req, res) => {
    const { title, content } = req.body;
    const query = 'INSERT INTO posts (title, content) VALUES (?, ?)';
    connection.query(query, [title, content], (err, result) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).json({ error: 'Error executing query' });
        } else {
            res.json({ id: result.insertId, message: 'Post created successfully' });
        }
    });
};

const updatePost = (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    const query = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
    connection.query(query, [title, content, postId], (err, result) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).json({ error: 'Error executing query' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            res.json({ message: 'Post updated successfully' });
        }
    });
};

const deletePost = (req, res) => {
    const postId = req.params.id;
    const query = 'DELETE FROM posts WHERE id = ?';
    connection.query(query, [postId], (err, result) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).json({ error: 'Error executing query' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            res.json({ message: 'Post deleted successfully' });
        }
    });
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};
