  import React from "react";
  import { motion } from "framer-motion";
  import { Gift, Package, Truck, FileText, HeartHandshake } from "lucide-react";
  import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
  import heroImage from "../components/images/herosection.jpg"; // Import hero image
  import { useNavigate } from "react-router-dom";

  // Google Maps API Key (replace with your own)
  const googleMapsApiKey = "AIzaSyDnUf6DMuoe4g3vtuI4K5oI-VamzBK8HOA";

  // Charity locations in New Delhi (latitude, longitude)
  const charityLocations = [
    { name: "Goonj", position: { lat: 28.5355, lng: 77.2599 } },
    { name: "HelpAge India", position: { lat: 28.5799, lng: 77.2476 } },
    { name: "CRY - Child Rights and You", position: { lat: 28.628, lng: 77.3649 } },
    { name: "Salaam Baalak Trust", position: { lat: 28.6328, lng: 77.2197 } },
    { name: "Smile Foundation", position: { lat: 28.4595, lng: 77.0266 } },
    { name: "Uday Foundation", position: { lat: 28.5691, lng: 77.1869 } },
    { name: "Pratham", position: { lat: 28.6139, lng: 77.209 } },
    { name: "Save the Children India", position: { lat: 28.5645, lng: 77.2167 } },
    { name: "Deepalaya", position: { lat: 28.7041, lng: 77.1025 } },
    { name: "SOS Children's Villages India", position: { lat: 28.5355, lng: 77.391 } },
  ];

  // Define libraries array outside the component to avoid re-renders
  const libraries: ("marker" | "places" | "geometry" | "drawing" | "visualization")[] = ["marker"];

  // GoogleMapComponent
  const GoogleMapComponent = () => {
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: googleMapsApiKey,
      libraries: libraries, // Use the static array
    });

    // Define the red marker icon inside the component after the script is loaded
    const redMarkerIcon = isLoaded
      ? {
          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // Red marker icon URL
          scaledSize: new window.google.maps.Size(40, 40), // Size of the marker
        }
      : null;

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Map...</div>;

    return (
      <GoogleMap
        zoom={12}
        center={{ lat: 28.6139, lng: 77.209 }} // Center the map on New Delhi
        mapContainerClassName="w-full h-[500px] rounded-lg shadow-lg"
        mapContainerStyle={{ width: "100%", height: "500px" }}
        options={{
          // Remove mapId if you don't have a custom map style
        }}
      >
        {charityLocations.map((charity, index) => (
          <Marker
            key={index}
            position={charity.position}
            title={charity.name}
            icon={redMarkerIcon} // Use the custom red marker icon
          />
        ))}
      </GoogleMap>
    );
  };

  const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
      <section className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="relative w-full h-[60vh] overflow-hidden ">
          {/* Background Image with Reduced Blue Effect */}
          <img
            src={heroImage}
            alt="Hero Section"
            className="w-full h-full object-cover blur"
          />

          {/* Gradient Overlay for Seamless Transition */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white"></div>

          {/* DonorDash Text Overlay (Purple Theme) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1
              className="text-5xl md:text-6xl font-bold text-purple-700 drop-shadow-lg mt-16"
              style={{ fontFamily: "'Hemi Head', sans-serif" }} // Force Hemi Head font
            >
              DonorDash
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-b from-purple-50 to-white flex-grow flex items-center justify-center px-6 py-16">
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Side: Header & CTA Buttons */}
            <div className="text-left">
              <span className="bg-purple-200 text-purple-700 px-4 py-1 rounded-full text-sm font-medium">
                Streamlining Charitable Giving
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
                Make Your Donations Count with DonorDash
              </h1>
              <p className="mt-4 text-gray-600 text-lg">
                Connect with verified charities, donate items that are needed, and
                track your impact. Making charitable giving as seamless as online
                shopping.
              </p>

              {/* CTA Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row items-start gap-4">
                <button
                  onClick={() => navigate("/donate")}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2"
                >
                  <Gift size={18} />  
                  Donate Now
                </button>
                <button
                  onClick={() => navigate("/how-it-works")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-6 py-3 rounded-lg flex items-center gap-2"
                >
                  How It Works
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Right Side: Feature Cards with Animation */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              {/* First Column (Higher) */}
              <div className="mt-[-40px]">
                <FeatureCard
                  icon={<Package size={28} />}
                  title="List Items"
                  description="Easily upload details about items you want to donate."
                />
              </div>
              <FeatureCard
                icon={<Truck size={28} />}
                title="Hassle-Free Pickup"
                description="Schedule convenient pickups from your doorstep."
              />

              <div className="mt-[-40px]">
                <FeatureCard
                  icon={<HeartHandshake size={28} />}
                  title="Smart Matching"
                  description="AI recommends the most suitable charities for your items."
                />
              </div>
              <FeatureCard
                icon={<FileText size={28} />}
                title="Delivery Proof"
                description="Get confirmation when your donations are received."
              />
            </motion.div>
          </div>
        </div>

        {/* Google Maps Section at the Bottom */}
        <div className="w-full bg-white py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Top 10 Charities in New Delhi
            </h2>
            <GoogleMapComponent />
          </div>
        </div>
      </section>
    );
  };

  const FeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }> = ({ icon, title, description }) => {
    return (
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-6 flex gap-4 items-start border border-gray-200 hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.05 }}
      >
        <div className="text-purple-600">{icon}</div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </motion.div>
    );
  };

  export default Home;