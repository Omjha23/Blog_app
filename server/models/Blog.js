const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  image: String,
});

module.exports = mongoose.model('Blog', BlogSchema);
