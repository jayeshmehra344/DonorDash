import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="font-sans bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Streamlining Charitable Giving</h1>
          <p className="mb-8">Make Your Donations Count with DonorDash</p>
          <p className="mb-8">Connect with verified charities, donate items that are needed, and track your impact. Making charitable giving as seamless as online shopping.</p>
          <div className="space-x-4">
            <button className="bg-white text-blue-600 px-6 py-2 rounded hover:bg-gray-100">Donate Now</button>
            <button className="bg-transparent border border-white text-white px-6 py-2 rounded hover:bg-white hover:text-blue-600">How It Works</button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* List Items */}
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">List Items</h2>
            <p>Easily upload details about items you want to donate.</p>
          </div>

          {/* Smart Matching */}
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Smart Matching</h2>
            <p>At recommends the most suitable charities for your items.</p>
          </div>

          {/* Hassle-Free Pickup */}
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Hassle-Free Pickup</h2>
            <p>Schedule convenient pickups from your doorstep.</p>
          </div>

          {/* Delivery Proof */}
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Delivery Proof</h2>
            <p>Get confirmation when your donations are received.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;