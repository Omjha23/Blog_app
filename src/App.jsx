import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import './App.css';
import img from './assets/logo.png';
import axios from 'axios';
// import RecentBlog from './components/RecentBlog'


function App() {
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs?limit=3');
        setRecentBlogs(response.data.blogs || []);
      } catch (error) {
        console.error('Error fetching recent blogs:', error);
      }
    };

    fetchRecentBlogs();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header -mt-5 font-[475] text-xl gap-4">
          <nav>
            <img src={img} alt="Logo" className="logo" />
            <div className="nav-links">
              <Link to="/" className="text-custom-color">Home</Link>
              <Link to="/blogs" className="text-custom-color">Blogs</Link>
              <Link to="/discover" className="text-custom-color">Discover Froker</Link>
            </div>

          </nav>
        </header>

         
        <Routes>
          <Route exact path="/" element={<Home recentBlogs={recentBlogs} />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = ({ recentBlogs }) => (
  <div>
    <h2>I am on the home page</h2>
    
    
  </div>
);

const Discover = () => <h2>Discover Froker</h2>;

export default App;
