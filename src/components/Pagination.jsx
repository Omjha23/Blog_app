import React from 'react';
import { Link } from 'react-router-dom';
import previousImage from '../assets/previous.png'; // Adjust the path as needed
import nextImage from '../assets/next.png'; // Adjust the path as needed

const Pagination = ({ page, totalPages, setPage, loading }) => {
  return (
    <div className="pagination flex items-center gap-4">
      <img
        src={previousImage}
        alt="Previous"
        className={`h-8 cursor-pointer ${page <= 1 || loading ? 'opacity-50' : ''}`}
        onClick={() => page > 1 && !loading && setPage(page - 1)}
      />
      <span>Page {page} of {totalPages}</span>
      <img
        src={nextImage}
        alt="Next"
        className={`h-8 cursor-pointer ${page >= totalPages || loading ? 'opacity-50' : ''}`}
        onClick={() => page < totalPages && !loading && setPage(page + 1)}
      />
    </div>
  );
};

export default Pagination;
