
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';
import FeaturedBlog from './FeaturedBlog';
import SmallBlog from './SmallBlog';
import Pagination from './Pagination';
import footer from '../assets/footer.png'
import footer2 from '../assets/footer2.png'

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/blogs?page=${page}`);
        setBlogs(response.data.blogs || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecentBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs?limit=3');
        setRecentBlogs(response.data.blogs || []);
      } catch (error) {
        console.error('Error fetching recent blogs:', error);
      }
    };

    fetchBlogs();
    fetchRecentBlogs();
  }, [page]);

  return (
    <div className="blog-list">
            <div className='mt-16'>

<h1 className='mt-4 text-4xl font-weight: 600;'><span className="text-[#F76F32]">FROKER</span> BLOG</h1>
</div>
      <p className='text-[#3D3D3D] font-semibold text-6xl mt-8'>Articles covering the most recent
      <br></br> updates and advancements</p>
      
 
      {/* <div className="recent-posts-row mt-6 max-w-10/11">
        {recentBlogs.length > 0 && (
          <div className="parent_div flex mx-auto ">
            <div className="w-1/3">
              <div className="child1 recent-blog h-full flex">
                <Blog blog={recentBlogs[0]} />
              </div>
            </div>
            <div className="child2 w-2/3 flex flex-col justify-between h-full">
              <div className="subchild_of_child2 recent-blog flex-1">
                <Blog blog={recentBlogs[1]} />
              </div>
              <div className="subchild_of_child2 recent-blog flex-1">
                <Blog blog={recentBlogs[2]} />
              </div>
            </div>
          </div>
        )}
      </div> */}
      {/* <div className="recent-posts-row mt-6">
        {recentBlogs.length > 0 && (
          <div className="parent_div flex max-w-6xl mx-auto gap-4">
            <div className="w-1/2 min-w-[300px]">
              <div className="child1 recent-blog h-full">
                <FeaturedBlog blog={recentBlogs[0]} />
              </div>
            </div>
            <div className="child2 w-1/2 space-y-4 flex flex-col justify-between">
              <div className="subchild_of_child2 recent-blog flex-1">
                <Blog blog={recentBlogs[1]} />
              </div>
              <div className="subchild_of_child2 recent-blog flex-1">
                <Blog blog={recentBlogs[2]} />
              </div>
            </div>
          </div>
        )}
      </div> */}
      <div className="recent-posts-row mt-6 max-w-10/11">
        {recentBlogs.length > 0 && (
          <div className="parent_div flex max-w-6xl mx-auto gap-4">
            <div className="w-1/2 max-w-[400px]">
              <div className="child1 h-full">
                <FeaturedBlog blog={recentBlogs[0]} />
              </div>
            </div>
            <div className="w-1/2 flex flex-col justify-between h-full gap-2">
              <div className="subchild_of_child2 flex-1">
                <SmallBlog blog={recentBlogs[1]} />
              </div>
              <div className="subchild_of_child2 flex-1">
                <SmallBlog blog={recentBlogs[2]} />
              </div>
            </div>
          </div>
        )}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <p className='text-5xl flex flex-start ml-36 mt-8 mb-8'> Recent Posts</p>
          {Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.map(blog => (
              <Blog key={blog._id} blog={blog} />
            ))
          ) : (
            <p>No blogs available.</p>
          )}
         
          
        </>
      )}
      <div className='flex justify-center mt-8'>
        <Pagination 
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          loading={loading}
        />
      </div>
      <footer>
        <img 
         loading="lazy"
        src={footer}
        ></img>
        <img 
         loading="lazy"
        src={footer2}
        ></img>
      
      </footer>
    </div>
  );
};

export default BlogList;
