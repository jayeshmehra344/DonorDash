import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaRegFileImage } from "react-icons/fa";
import { BiCheckCircle } from "react-icons/bi";

const Donate: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      itemName: "",
      category: "",
      condition: "",
      quantity: "",
      description: "",
      pickupAddress: "",
      pickupDate: "",
      pickupTime: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);
    }
  };

  const handleNext = () => {
    if (step === 1 && !watch("itemName")) return;
    if (step === 2 && images.length === 0) return;
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const onSubmit = (data: any) => {
    console.log("Donation Submitted:", data);
    setIsSubmitted(true);

    setTimeout(() => {
      navigate(0);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 text-black p-8 pt-20">
      <h1 className="text-3xl font-bold mb-8"
      style={{ fontFamily: "'Hemi Head', sans-serif" }} >Donate Items</h1>
      <p className="text-gray-600 mb-6">
        List your items for donation and we'll match you with charities that need them most.
      </p>

      {/* Step Indicator */}
      <div className="flex w-full max-w-2xl justify-between border-b border-gray-300 pb-2">
        {["Item Details", "Images", "Pickup Details"].map((label, index) => (
          <button
            key={index}
            className={`flex-1 py-2 text-center ${step === index + 1 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"} font-semibold rounded-md flex items-center justify-center gap-2`}
            disabled
          >
            {step > index + 1 ? <BiCheckCircle className="text-white" /> : index + 1} {label}
          </button>
        ))}
      </div>

      {/* Submission Notification */}
      {isSubmitted && (
        <div className="fixed top-16 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg">
          🎉 Donation Submitted Successfully!
        </div>
      )}

      {/* Step 1: Item Details */}
      {step === 1 && (
        <form onSubmit={handleSubmit(handleNext)} className="w-full max-w-2xl bg-white p-6 mt-6 rounded-lg shadow-lg">
          <label className="block mb-2">Item Name</label>
          <input type="text" {...register("itemName", { required: true })} className="w-full p-2 bg-gray-100 border border-gray-300 rounded" />
          {errors.itemName && <p className="text-red-500 text-sm">Item name is required.</p>}

          <div className="flex gap-4 mt-4">
            <div className="flex-1">
              <label className="block mb-2">Category</label>
              <select {...register("category")} className="w-full p-2 bg-gray-100 border border-gray-300 rounded">
                <option value="">Select category</option>
                <option value="clothing">Clothing</option>
                <option value="food">Food</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-2">Condition</label>
              <select {...register("condition")} className="w-full p-2 bg-gray-100 border border-gray-300 rounded">
                <option value="">Select condition</option>
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>
          </div>

          <label className="block mt-4 mb-2">Quantity</label>
          <input type="number" {...register("quantity")} className="w-full p-2 bg-gray-100 border border-gray-300 rounded" />

          <label className="block mt-4 mb-2">Description</label>
          <textarea {...register("description")} className="w-full p-2 bg-gray-100 border border-gray-300 rounded"></textarea>

          <button type="submit" className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-semibold">
            Next →
          </button>
        </form>
      )}

      {/* Step 2: Upload Images */}
      {step === 2 && (
        <div className="w-full max-w-2xl bg-white p-6 mt-6 rounded-lg shadow-lg">
          <label className="block mb-2">Upload Images</label>
          <div className="border-2 border-dashed p-6 text-center bg-gray-50 rounded-md">
            <AiOutlineCloudUpload className="mx-auto text-3xl text-gray-400" />
            <p className="text-gray-600 mt-2">Drag and drop images or click to browse</p>

            <input id="file-upload" type="file" multiple onChange={handleFileChange} className="hidden" />

            <label htmlFor="file-upload" className="cursor-pointer bg-gray-200 px-4 py-2 rounded mt-2 block text-center">
              Choose Files
            </label>
          </div>

          {/* Image Preview */}
          <div className="mt-4 border p-4 text-center text-gray-600 rounded-md">
            {images.length === 0 ? (
              <p><FaRegFileImage className="inline mr-2"/> No images uploaded yet</p>
            ) : (
              images.map((file, index) => <p key={index}>{file.name}</p>)
            )}
          </div>

          <div className="flex justify-between mt-4">
            <button onClick={handleBack} className="px-4 py-2 bg-gray-300 rounded text-gray-700">Back</button>
            <button onClick={handleNext} disabled={images.length === 0} className={`px-6 py-2 ${images.length > 0 ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-400 cursor-not-allowed"} rounded text-white font-semibold`}>
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Updated Pickup Details */}
      {step === 3 && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl bg-white p-6 mt-6 rounded-lg shadow-lg">
          <label className="block font-semibold mb-2">Pickup Location</label>
          <input type="text" {...register("pickupAddress")} className="w-full p-3 bg-gray-100 border border-gray-300 rounded" placeholder="Enter your full address" />

          <div className="flex gap-4 mt-4">
            <input type="date" {...register("pickupDate")} className="w-full p-3 bg-gray-100 border border-gray-300 rounded" />
            <input type="time" {...register("pickupTime")} className="w-full p-3 bg-gray-100 border border-gray-300 rounded" />
          </div>

          <button type="submit" className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded text-white font-semibold w-full">
            Submit Donation
          </button>
        </form>
      )}
    </div>
  );
};

export default Donate;
