// import React from 'react';
// import { Link } from 'react-router-dom';

// const FeaturedBlog = ({ blog }) => {
//   return (
//     <div className="featured-blog-card">
//       <img src={blog.image} alt="Blog" className="featured-blog-image w-full h-48 object-cover rounded-lg" />
//       <div className="featured-blog-content">
//         <div className="blog-meta">
//           <span className='text-[#F76F32]'>{blog.author} - {new Date(blog.date).toLocaleDateString()}</span>
//         </div>
//         <h2 className='font-[500] text-xl'>{blog.title.substring(0, 20)}...</h2>
//         <p className='text-gray-700 mt-2'>{blog.content.substring(0, 75)}...</p>
//         <Link to={`/blogs/${blog._id}`} className="text-[#F76F32] mt-4 inline-block underline">Read more...</Link>
//       </div>
//     </div>
//   );
// };

// export default FeaturedBlog;
// src/components/FeaturedBlog.js
import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedBlog = ({ blog }) => {
  return (
    <div className="featured-blog-card h-full flex flex-col">
      <img
        src={blog.image}
        alt="Featured Blog"
        className="w-full h-64 object-cover rounded-lg"
      />
      <div className="p-4 flex flex-col flex-1">
        <div className="text-[#F76F32] mb-2 -ml-56">
          {blog.author} - {new Date(blog.date).toLocaleDateString()}
        </div>
        <h2 className="font-semibold text-xl mb-2 -ml-24">{blog.title.substring(0,30)}...</h2>
        <p className="text-gray-700 flex-1 -ml-4 text-left " >{blog.content.substring(0, 70)}...</p>
        <Link to={`/blogs/${blog._id}`} className="text-[#F76F32] mt-4 inline-block underline -ml-72">
          Read more...
        </Link>
      </div>
    </div>
  );
};

export default FeaturedBlog;
