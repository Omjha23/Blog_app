const Blog = require('../models/Blog');

// Get all blogs
exports.getBlogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const blogs = await Blog.find().skip(skip).limit(limit);
  const totalBlogs = await Blog.countDocuments();
  const totalPages = Math.ceil(totalBlogs / limit);
  res.json({ blogs, totalPages });
};

// Get blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new blog
exports.createBlog = async (req, res) => {
  const newBlog = new Blog(req.body);
  await newBlog.save();
  res.json(newBlog);
};

// Like a blog
exports.likeBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  blog.likes += 1;
  await blog.save();
  res.json(blog);
};

// Unlike a blog
exports.unlikeBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  blog.likes -= 1;
  await blog.save();
  res.json(blog);
};
