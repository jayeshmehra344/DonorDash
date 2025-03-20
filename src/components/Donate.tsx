import React from "react";
import DonateForm from "./form/Donateform";

const DonatePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20">
      <DonateForm />
    </div>
  );
};

export default DonatePage;
