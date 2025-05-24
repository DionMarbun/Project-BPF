// File: src/pages/NotFound.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // kalau pakai react-router

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200">
      <div className="bg-white rounded-3xl p-10 w-11/12 max-w-4xl text-center shadow-lg">
        <div className="relative">
          {/* Gambar utama */}
          <img
            src="/img/Error.jpeg" 
            alt="404 Illustration"
            className="mx-auto w-72 mb-6"
          />
          {/* Angka 404 */}
          <h1 className="text-9xl font-bold text-blue-700 opacity-20 z-0 mt-4">
    404
  </h1>
        </div>
        
        {/* Text */}
        <p className="text-gray-700 text-xl mb-6">Oops! Page Not Found</p>

        {/* Tombol */}
        <button
          onClick={handleBackHome}
          className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-full shadow hover:opacity-90 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
