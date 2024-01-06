// routes/users.js
const express = require('express');
const router = express.Router();
const { pool } = require('../db/index');

// Create user
router.post('/', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Get all users
router.get('/', async (req, res, next) => {
  try {
    const allUsers = await pool.query('SELECT * FROM users');
    res.json(allUsers.rows);
  } catch (error) {
    next(error);
  }
});

// Other routes (update, delete, etc.) can be added similarly

module.exports = router;
