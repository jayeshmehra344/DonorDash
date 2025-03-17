import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo on the Left */}
          <Link to="/" className="text-xl font-bold text-purple-600">
            DonorDash
          </Link>

          {/* Navigation Links and Buttons on the Right */}
          <div className="flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-purple-600">
                Home
              </Link>
              <Link to="/donate" className="text-gray-700 hover:text-purple-600">
                Donate
              </Link>
              <Link to="/charities" className="text-gray-700 hover:text-purple-600">
                Charities
              </Link>
              <Link to="/how-it-works" className="text-gray-700 hover:text-purple-600">
                How It Works
              </Link>
            </div>

            {/* Login and Get Started Buttons */}
            <div className="flex items-center space-x-6">
              <Link to="/login" className="text-gray-700 hover:text-purple-600">
                Login
              </Link>
              <Link
                to="/get-started"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;