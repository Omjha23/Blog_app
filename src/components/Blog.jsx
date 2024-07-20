import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Blog = ({ blog }) => {
  const [likes, setLikes] = useState(blog.likes);

  const likeBlog = async () => {
    const response = await axios.put(`/api/blogs/${blog._id}/like`);
    setLikes(response.data.likes);
  };

  const unlikeBlog = async () => {
    const response = await axios.put(`/api/blogs/${blog._id}/unlike`);
    setLikes(response.data.likes);
  };

  return (
    <div className="blog-card border-none p-4 shadow-none rounded-lg">
      <img src={blog.image} alt="Blog" className="w-full h-48 object-cover rounded-lg" />
      <div className="blog-content mt-4">
        <div className="blog-meta text-[#F76F32]">
          <span>{blog.author} - {new Date(blog.date).toLocaleDateString()}</span>
        </div>
        <h2 className='font-medium text-xl mt-2 -ml-8'>{blog.title.substring(0, 20)}...</h2>
        <p className='text-gray-700 mt-2 text-left'>{blog.content.substring(0, 100)}...</p>
        <br />
        <Link to={`/blogs/${blog._id}`} className="text-[#F76F32] mt-4 inline-block underline -ml-36">Read more...</Link>
      </div>
    </div>
  );
};

export default Blog;
