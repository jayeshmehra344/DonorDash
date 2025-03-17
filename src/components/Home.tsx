import React from "react";
import { Gift, Package, Truck, FileText, HeartHandshake } from "lucide-react";

const Home: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-purple-50 to-white min-h-screen flex items-center justify-center px-6">
      <div className="max-w-6xl w-full text-center lg:text-left">
        {/* Header */}
        <span className="bg-purple-200 text-purple-700 px-4 py-1 rounded-full text-sm font-medium">
          Streamlining Charitable Giving
        </span>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
          Make Your Donations Count with DonorDash
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Connect with verified charities, donate items that are needed, and track your impact. Making charitable giving as seamless as online shopping.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2">
            <Gift size={18} />
            Donate Now
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-6 py-3 rounded-lg flex items-center gap-2">
            How It Works
            <span>→</span>
          </button>
        </div>

        {/* Features */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-2/3">
          <FeatureCard icon={<Package size={28} />} title="List Items" description="Easily upload details about items you want to donate." />
          <FeatureCard icon={<Truck size={28} />} title="Hassle-Free Pickup" description="Schedule convenient pickups from your doorstep." />
          <FeatureCard icon={<HeartHandshake size={28} />} title="Smart Matching" description="AI recommends the most suitable charities for your items." />
          <FeatureCard icon={<FileText size={28} />} title="Delivery Proof" description="Get confirmation when your donations are received." />
        </div>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex gap-4 items-start border border-gray-200">
      <div className="text-purple-600">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Home;
