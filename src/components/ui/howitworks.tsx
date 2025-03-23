import React from 'react';
import img1 from '../images/list.jpg'; // Corrected import path
import img2 from '../images/ai-matching.jpg';
import img3 from '../images/delivery.jpg';
import img4 from '../images/proof.jpg';
import img5 from '../images/report.jpg';

const HowItWorks = () => {
  const steps = [
    {
      id: '01',
      title: 'List Your Items',
      description:
        'Begin by listing the items you want to donate. Provide details such as item category, condition, quantity, and upload photos to help charities understand what you\'re offering.',
      image: img1, // Use the imported image
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
    },
    {
      id: '02',
      title: 'AI Matching & Charity Confirmation',
      description:
        'Our smart algorithm recommends suitable charities based on their specific needs. Charities can then confirm their interest in your items, ensuring a perfect match.',
      image: img2, // Placeholder image
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      id: '03',
      title: 'Pickup & Delivery',
      description:
        'Once a charity confirms interest, we arrange for pickup or delivery of your items. Our logistics ensure a smooth and hassle-free process.',
      image: img3, // Placeholder image
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
    },
    {
      id: '04',
      title: 'Proof of Donation',
      description:
        'After the donation is complete, you will receive a proof of donation. This can be used for tax deductions or personal records.',
      image: img4, // Placeholder image
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: '05',
      title: 'Impact Report',
      description:
        'Receive a detailed impact report showing how your donation has made a difference. See the positive change you\'ve contributed to.',
      image: img5, // Placeholder image
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white pt-24 pb-12"> {/* Changed background to white */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-4xl font-extrabold text-center text-purple-700 mb-8 drop-shadow-lg"
          style={{ fontFamily: "'Hemi Head', sans-serif" }}
        >
          How It Works
        </h2>
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`group flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-8 p-6 rounded-lg hover:bg-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 cursor-pointer border border-transparent`}
            >
              {/* Image with hover effect */}
              <div className="w-full md:w-1/2 transform transition-transform duration-300 hover:scale-105">
                <img
                  src={step.image}
                  alt={step.title}
                  className="rounded-lg shadow-lg w-full h-64 object-cover"
                />
              </div>

              {/* Content with hover effect and icon */}
              <div className="w-full md:w-1/2 space-y-4 transform transition-transform duration-300 hover:scale-105">
                <div className="flex items-center space-x-4">
                  {step.icon}
                  <span className="text-sm font-semibold text-purple-600">Step {step.id}</span>
                </div>
                <h3
                  className="text-2xl font-bold text-purple-700"
                  style={{ fontFamily: "'Hemi Head', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;