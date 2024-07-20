const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);  // New route to get blog by ID
router.post('/', blogController.createBlog);
router.put('/:id/like', blogController.likeBlog);
router.put('/:id/unlike', blogController.unlikeBlog);

module.exports = router;
