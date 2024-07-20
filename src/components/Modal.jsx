import React, { useState } from 'react';
import logo from '../assets/logo2.png'; // Ensure correct path to your image

const Modal = ({ show, onClose }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  if (!show) return null;

  const handleSubscribe = () => {
    // Handle the subscription logic here
    setSubscribed(true);
    setTimeout(() => onClose(), 2000); // Close the modal after 2 seconds
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-800 opacity-50" onClick={onClose} />
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-3xl min-h-[350px] flex flex-col items-center justify-center">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
          &times;
        </button>
        <div className="flex items-center mb-6">
          <img src={logo} alt="Logo" className="w-32 h-32 mr-6" /> {/* Adjusted logo size */}
          <div className="text-center w-full">
            {subscribed ? (
              <p className="text-lg font-semibold">Thank you for subscribing!</p>
            ) : (
              <div>
                <p className="text-lg font-semibold mb-4">Stay tuned!</p>
                <p className="mb-4">Subscribe to our Newsletter for <br />Exclusive Updates, Tips, and More.</p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleSubscribe}
                  className="w-full bg-orange-500 text-white p-2 rounded"
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
