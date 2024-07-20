// src/components/SmallBlog.js
import React from 'react';
import { Link } from 'react-router-dom';

const SmallBlog = ({ blog }) => {
  return (
    <div className="small-blog-card flex">
      <img
        src={blog.image}
        alt="Small Blog"
        className="w-60 h-52 object-cover mr-4 rounded-lg"
      />
      <div className="flex flex-col flex-1">
        <div className="text-[#F76F32] mb-2 -ml-4">
          {blog.author} - {new Date(blog.date).toLocaleDateString()}
        </div>
        <h2 className="font-semibold text-lg mb-2 -ml-2">{blog.title.substring(0, 20)}...</h2>
        <p className="text-gray-700 max-w-[220px] text-left">{blog.content.substring(0, 50)}...</p>
        <Link to={`/blogs/${blog._id}`} className="text-[#F76F32] mt-2 inline-block underline -ml-20">
          Read more...
        </Link>
      </div>
    </div>
  );
};

export default SmallBlog;
