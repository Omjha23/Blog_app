const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); // Ensure this is called early

console.log(`PORT from .env: ${process.env.PORT}`); // Log to check if PORT is being read

const app = express();
const port = process.env.PORT || 4000;
const blogRoutes = require('./routes/blogRoutes');
const db = require('./config/db');

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
db.connect();

// Routes
app.use('/api/blogs', blogRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
