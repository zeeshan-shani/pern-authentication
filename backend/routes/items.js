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

// Ensure 'User demographics' table exists
const userDemographics = async (res) => {
  try {
    await pool.query(`
   CREATE TABLE IF NOT EXISTS "user_demographics" (
      id SERIAL PRIMARY KEY,
      age VARCHAR(255) NOT NULL,
      job VARCHAR(255) NOT NULL,
      userId INTEGER REFERENCES register_users(id) ON DELETE CASCADE
    )
  `);
    console.log("Table 'userDemographics' created or already exists.");

    // Retrieve data from the database

    // Check if there are any users
  } catch (error) {
    console.error("Error creating 'userDemographics' table:", error.message);
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
  await userDemographics();
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

// userDemographics Users
router.post("/user_demographics", async (req, res, next) => {
  try {
    const { age, job, userId } = req.body;
    await userDemographics();
    const demographics = await pool.query(
      "INSERT INTO user_demographics (age, job,userId) VALUES($1, $2,$3) RETURNING *",
      [age, job, userId]
    );

    // Send a success response with the inserted data
    res.status(201).json({
      success: true,
      message: "User demographics added successfully",
      data: demographics.rows[0],
    });
  } catch (error) {
    // Send an error response with a generic message
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
});
// userDemographics Users
router.get("/user_demographics", async (req, res, next) => {
  try {
    const { age, job, userId } = req.body;
    await userDemographics();
    const data = await pool.query("SELECT * FROM user_demographics");

    // Send a success response with the inserted data
    res.status(201).json({
      data: data.rows,
    });
  } catch (error) {
    // Send an error response with a generic message
    res.status(500).json({ error: "Internal Server Error" });
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
    if (loginPassword === userExistQuery.rows[0].password) {
      // Passwords match, generate JWT token
      const token = generateToken(userExistQuery.rows[0].id);
      res.json({ token, userId: userExistQuery.rows[0].id });
    } else {
      // Passwords do not match
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error Login" });
    next(error);
  }
});

// Use the error handling middleware
router.use(errorHandler);

module.exports = router;
