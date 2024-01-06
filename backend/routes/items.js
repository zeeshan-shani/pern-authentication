const express = require("express");
const router = express.Router();
const pool = require("../db");
const jwt = require("jsonwebtoken");

// Ensure 'registeredUserTable' table exists
const registeredUserTable = async (res) => {
  try {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS register_users (
      id SERIAL PRIMARY KEY,
      userExist VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `);
    console.log("Table 'register_users' created or already exists.");

    // Retrieve data from the database

    // Check if there are any users
  } catch (error) {
    console.error("Error creating 'register_users' table:", error.message);
    throw error;
  }
};

const loginUserTable = async () => {
  try {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS loginUsers (
      id SERIAL PRIMARY KEY,
      loginName VARCHAR(255) NOT NULL,
      loginPassword VARCHAR(255) NOT NULL
    )
  `);
    console.log("Table 'loginUsers' created or already exists.");
  } catch (error) {
    console.error("Error creating 'loginUsers' table:", error.message);
    throw error;
  }
};

const initializeTables = async () => {
  await registeredUserTable();
  await loginUserTable();
};
initializeTables();

// Middleware for handling errors
const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  res.status(500).json({ error: "Internal Server Error" });
};

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    "secretkey123", // replace with a secure secret key
    { expiresIn: "1h" }
  );
};

// Register Users
router.post("/register-user", async (req, res, next) => {
  try {
    const { userExist, email, password } = req.body;
    const registerUser = await pool.query(
      "INSERT INTO register_users (userExist, email, password ) VALUES($1, $2, $3) RETURNING *",
      [userExist, email, password]
    );
    // After registering, generate JWT token and send it back to the user
    registeredUserTable(res);
    if (registerUser.rows.length > 0) {
      // Generate JWT token
      const token = generateToken(registerUser.rows[0].id);
      res.json({ token });
    } else {
      res.status(500).json({ error: "No registered users found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error Register" });
    next(error);
  }
});

// Login Users
router.post("/login", async (req, res, next) => {
  try {
    const { loginName, loginPassword } = req.body;
    const userExistQuery = await pool.query(
      "SELECT * FROM register_users WHERE userExist = $1",
      [loginName]
    );
    // Compare the entered hashed password with the stored hashed password
    if (loginPassword === userExistQuery.rows[0].password) {
      // Passwords match, generate JWT token
      const token = generateToken(userExistQuery.rows[0].id);
      res.json({ token });
    } else {
      // Passwords do not match
      res.status(401).json({ error: "Invalid credentials" });
    }
    // const loginUser = await pool.query(
    //   "INSERT INTO loginUsers (loginName, loginPassword ) VALUES($1, $2) RETURNING *",
    //   [loginName, loginPassword]
    // );
    // res.json(loginUser.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error Login" });
    next(error);
  }
});

// Use the error handling middleware
router.use(errorHandler);

module.exports = router;
