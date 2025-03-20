import React, { useState } from "react";

const Donate: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    condition: "",
    quantity: "",
    description: "",
    images: [] as File[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, images: Array.from(e.target.files) });
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (formData.itemName && formData.category && formData.condition && formData.quantity && formData.description) {
        setStep(step + 1);
      } else {
        alert("Please fill out all fields before proceeding.");
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 text-black p-8 pt-20">
      <h1 className="text-3xl font-bold mb-2">Donate Items</h1>
      <p className="text-gray-600 mb-6">List your items for donation and we'll match you with charities that need them most.</p>

      {/* Step Indicator */}
      <div className="flex w-full max-w-2xl justify-between border-b border-gray-300 pb-2">
        {["Item Details", "Images", "Pickup Details"].map((label, index) => (
          <button
            key={index}
            className={`flex-1 py-2 text-center ${
              step === index + 1 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
            } font-semibold rounded-md`}
            disabled={index + 1 > step}
          >
            {index + 1} {label}
          </button>
        ))}
      </div>

      {/* Step 1: Item Details */}
      {step === 1 && (
        <div className="w-full max-w-2xl bg-white p-6 mt-6 rounded-lg shadow-lg">
          <label className="block mb-2">Item Name</label>
          <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} className="w-full p-2 bg-gray-100 border border-gray-300 rounded" />

          <div className="flex gap-4 mt-4">
            <div className="flex-1">
              <label className="block mb-2">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 bg-gray-100 border border-gray-300 rounded">
                <option value="">Select category</option>
                <option value="clothing">Clothing</option>
                <option value="food">Food</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-2">Condition</label>
              <select name="condition" value={formData.condition} onChange={handleChange} className="w-full p-2 bg-gray-100 border border-gray-300 rounded">
                <option value="">Select condition</option>
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>
          </div>

          <label className="block mt-4 mb-2">Quantity</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full p-2 bg-gray-100 border border-gray-300 rounded" />

          <label className="block mt-4 mb-2">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 bg-gray-100 border border-gray-300 rounded"></textarea>

          <button onClick={handleNext} className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-semibold flex items-center gap-2">
            Next →
          </button>
        </div>
      )}

      {/* Step 2: Upload Images */}
      {step === 2 && (
        <div className="w-full max-w-2xl bg-white p-6 mt-6 rounded-lg shadow-lg">
          <label className="block mb-2">Upload Images</label>
          <div className="border-dashed border-2 border-gray-300 p-6 text-center rounded-lg">
            <input type="file" multiple onChange={handleFileChange} className="hidden" id="fileUpload" />
            <label htmlFor="fileUpload" className="cursor-pointer">
              <div className="text-gray-500">Drag and drop images or click to browse</div>
              <button className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded">Choose Files</button>
            </label>
          </div>

          <div className="mt-4">
            <label className="block mb-2">Preview</label>
            {formData.images.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {formData.images.map((file, index) => (
                  <img key={index} src={URL.createObjectURL(file)} alt="Preview" className="w-24 h-24 object-cover rounded" />
                ))}
              </div>
            ) : (
              <div className="bg-gray-100 p-4 text-gray-500 text-center rounded">No images uploaded yet</div>
            )}
          </div>

          <div className="flex justify-between mt-4">
            <button onClick={handleBack} className="px-4 py-2 bg-gray-300 rounded text-gray-700">Back</button>
            <button onClick={handleNext} className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-semibold">Next →</button>
          </div>
        </div>
      )}

      {/* Step 3 Placeholder */}
      {step === 3 && (
        <div className="w-full max-w-2xl bg-white p-6 mt-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold">Step 3: Pickup Details (Coming Soon)</h2>
          <div className="flex justify-between mt-4">
            <button onClick={handleBack} className="px-4 py-2 bg-gray-300 rounded text-gray-700">Back</button>
            <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-semibold">Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donate;
