const express = require('express');
const cors = require('cors');
const itemsRouter = require('./routes/items');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test route to check the database connection
app.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT $1::text as message', ['Hello, PostgreSQL!']);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Use the items router for CRUD operations
app.use('/api', itemsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
