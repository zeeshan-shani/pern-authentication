
const pool = require('../db');

// Controller function for registering a new user
const registerUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, email, password } = req.body;

    // Simple validation to check if fields are not empty
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Please fill in all fields' });
    }

    // You can perform additional validation or checks here

    // Insert the user data into the database
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );

    // Return the newly registered user
    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export the controller function
module.exports = { registerUser };
