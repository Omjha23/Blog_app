import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa'; // Import icons
import blogdetail from '../assets/blogdetail.png';
import min from '../assets/2min.png';
import ki from '../assets/2min.png';
import share from '../assets/share.png'; // Import share image
import Blog from './Blog';
import Pagination from './Pagination';
import footer from '../assets/footer.png';
import footer2 from '../assets/footer2.png';
import Modal from './Modal';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false); // State for like/unlike
  const [likeCount, setLikeCount] = useState(0); // State for like count

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${id}`);
        setBlog(response.data);
        setLikeCount(response.data.likes || 0); // Initialize like count from response
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    const fetchRecentBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/blogs?limit=3&page=${page}`);
        setRecentBlogs(response.data.blogs || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching recent blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
    fetchRecentBlogs();
  }, [id, page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 200) {
        setShowModal(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLikeToggle = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1); // Update like count
  };

  const formatContent = (content) => {
    const lines = content.split('\n');
    let formattedContent = '';
    let isNumberedList = false;
    let headingNumber = 1;
    let numberOfHeadings = 0;

    lines.forEach((line) => {
      if (/^#/.test(line.trim())) {
        if (numberOfHeadings === 3) {
          formattedContent += `<img src="${ki}" alt="Additional" class="my-4" />`;
        }
        formattedContent += `<h2>${headingNumber}. ${line.replace(/^#\s*/, '')}</h2>`;
        headingNumber++;
        numberOfHeadings++;
      } else if (/^\d+\./.test(line.trim())) {
        if (!isNumberedList) {
          formattedContent += '<ol>';
          isNumberedList = true;
        }
        formattedContent += `<li>${line.replace(/^\d+\.\s*/, '')}</li>`;
      } else {
        if (isNumberedList) {
          formattedContent += '</ol>';
          isNumberedList = false;
        }
        formattedContent += `<p>${line}</p>`;
      }
    });

    if (isNumberedList) {
      formattedContent += '</ol>';
    }

    return formattedContent;
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <div className="max-w-9/12 mx-auto px-8 py-8"> {/* Adjusted padding */}
        <img
          src={blogdetail}
          alt="Background"
          className="ml-36 mb-4 -mt-6 h-7"
        />
        <div className="relative">
          <img
            src={blog.image}
            alt="Blog"
            className="rounded-3xl w-[75%] h-auto mx-auto object-cover mb-6"
          />
          <p className="absolute top-4 left-1/2 transform -translate-x-[450px] translate-y-[380px] font-bold bg-opacity-75 p-4 rounded-lg text-white text-3xl text-left">
            {blog.title}
          </p>
        </div>
        <div className="px-4">
          <div className="flex items-center justify-between text-gray-600 text-sm mb-2 ml-36 -ml-8"> {/* Adjusted margin-left */}
            <div className="flex items-center">
              <span className="text-[#F76F32] text-xl mr-2">{blog.author}</span>
              <img src={min} alt="Min" className="w-40 h-8 mr-4" />
            </div>
            <div className="flex flex-col items-center mr-8"> {/* Added margin-right */}
              <button onClick={handleLikeToggle} className="text-2xl text-[#F76F32]">
                {liked ? <FaHeart /> : <FaRegHeart />}
              </button>
              <span className="text-xl text-[#F76F32]">{likeCount}</span>
            </div>
          </div>
          <h2 className="text-3xl font-semibold mb-4 text-left">{blog.title}</h2>
          <span
            className="text-gray-800 text-base leading-relaxed block text-left"
            dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }}
          />
        </div>

        {/* Centered Recent Posts Section */}
        <div className="recent-posts-row mt-12 px-4">
          <h3 className="text-4xl mb-2 -ml-[900px] font-bold">Popular Posts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recentBlogs.length > 0 ? (
              recentBlogs.map((post) => (
                <div key={post.id} className="w-full max-w-[400px] mx-auto">
                  <Blog blog={post} />
                </div>
              ))
            ) : (
              <p>No Popular posts available.</p>
            )}
          </div>
          {/* Centered Pagination Component */}
          <div className="flex justify-center mt-8">
            <Pagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              loading={loading}
            />
          </div>
        </div>
      </div>

      <footer>
        <img 
          loading="lazy"
          src={footer}
          alt="Footer"
        />
        <img className='full bg-cover'
          loading="lazy"
          src={footer2}
          alt="Footer2"
        />
      </footer>

      {/* Modal Component */}
      <Modal show={showModal} onClose={() => setShowModal(false)} />

      {/* Share Button */}
      <div className="fixed top-1/2 right-0 transform -translate-y-1/2">
        <img src={share} alt="Share" className="w-12 h-48 cursor-pointer" />
      </div>
    </div>
  );
};

export default BlogDetail;
