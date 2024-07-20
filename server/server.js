const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
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
