import React from 'react';
import img1 from 'C:/Users/Sohum Srivastava/Desktop/donordash/DonorDash/src/components/images/list.jpg'; // Corrected import path

const HowItWorks = () => {
  const steps = [
    {
      id: '01',
      title: 'List Your Items',
      description:
        'Begin by listing the items you want to donate. Provide details such as item category, condition, quantity, and upload photos to help charities understand what you\'re offering.',
      image: img1, // Use the imported image
    },
    {
      id: '02',
      title: 'AI Matching & Charity Confirmation',
      description:
        'Our smart algorithm recommends suitable charities based on their specific needs. Charities can then confirm their interest in your items, ensuring a perfect match.',
      image: 'https://via.placeholder.com/150', // Placeholder image
    },
    {
      id: '03',
      title: 'Pickup & Delivery',
      description:
        'Once a charity confirms interest, we arrange for pickup or delivery of your items. Our logistics ensure a smooth and hassle-free process.',
      image: 'https://via.placeholder.com/150', // Placeholder image
    },
    {
      id: '04',
      title: 'Proof of Donation',
      description:
        'After the donation is complete, you will receive a proof of donation. This can be used for tax deductions or personal records.',
      image: 'https://via.placeholder.com/150', // Placeholder image
    },
    {
      id: '05',
      title: 'Impact Report',
      description:
        'Receive a detailed impact report showing how your donation has made a difference. See the positive change you\'ve contributed to.',
      image: 'https://via.placeholder.com/150', // Placeholder image
    },
  ];

  return (
    <div className="bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">How It Works</h2>
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <img
                  src={step.image}
                  alt={step.title}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2 space-y-4">
                <span className="text-sm font-semibold text-indigo-600">Step {step.id}</span>
                <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
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