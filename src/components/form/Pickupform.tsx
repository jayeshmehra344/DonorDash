import { useState } from "react";

const Donate = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    condition: "",
    quantity: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl font-bold mb-2">Donate Items</h1>
      <p className="text-gray-400 mb-6">List your items for donation and we'll match you with charities that need them most.</p>

      <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Item Name</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
              placeholder="Enter item name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
              >
                <option value="">Select category</option>
                <option value="Clothes">Clothes</option>
                <option value="Food">Food</option>
                <option value="Books">Books</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Condition</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
              >
                <option value="">Select condition</option>
                <option value="New">New</option>
                <option value="Gently Used">Gently Used</option>
                <option value="Old">Old</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
              placeholder="Enter quantity"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
              placeholder="Provide details about your item"
            />
          </div>

          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded">
            Next →
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donate;
