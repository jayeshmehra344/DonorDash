import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaRegFileImage } from "react-icons/fa";
import { BiCheckCircle } from "react-icons/bi";
import axios from "axios";

const Donate: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
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

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("item_name", data.itemName);
    formData.append("category", data.category);
    formData.append("condition", data.condition);
    formData.append("quantity", data.quantity);
    formData.append("description", data.description);
    formData.append("pickup_address", data.pickupAddress);
    formData.append("pickup_date", data.pickupDate);
    formData.append("pickup_time", data.pickupTime);
    images.forEach((image) => formData.append("images[]", image)); 


    try {
      const response = await axios.post("/api/donations", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Donation Submitted:", response.data);
      setIsSubmitted(true);
      reset();
      setImages([]);
      setStep(1);

      // Scroll up after submission
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Reload after 2 secs
      setTimeout(() => navigate(0), 2000);
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("Failed to submit donation. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 text-black p-8 pt-20">
      <h1 className="text-3xl font-bold mb-2">Donate Items</h1>
      <p className="text-gray-600 mb-6 text-center">
        List your items for donation and we'll match you with charities that need them most.
      </p>

      {/* Step Indicator */}
      <div className="flex w-full max-w-2xl justify-between mb-6">
        {["Item Details", "Images", "Pickup Details"].map((label, index) => (
          <div
            key={index}
            className={`flex-1 mx-1 py-2 rounded-md text-center font-semibold flex items-center justify-center gap-2
              ${step === index + 1
                ? "bg-purple-600 text-white"
                : step > index + 1
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } transition-all duration-300`}
          >
            {step > index + 1 ? <BiCheckCircle className="text-white" /> : index + 1}
            {label}
          </div>
        ))}
      </div>

      {/* Submission Notification */}
      {isSubmitted && (
        <div className="fixed top-16 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg transition-all duration-500">
          🎉 Donation Submitted Successfully!
        </div>
      )}

      {/* Step 1: Item Details */}
      {step === 1 && (
        <form onSubmit={handleSubmit(handleNext)} className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
          <label className="block mb-2">Item Name<span className="text-red-500">*</span></label>
          <input
            type="text"
            {...register("itemName", { required: true })}
            className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
          />
          {errors.itemName && <p className="text-red-500 text-sm">Item name is required.</p>}

          <div className="flex gap-4 mt-4">
            <div className="flex-1">
              <label className="block mb-2">Category<span className="text-red-500">*</span></label>
              <select {...register("category", { required: true })} className="w-full p-2 bg-gray-100 border border-gray-300 rounded">
                <option value="">Select category</option>
                <option value="clothing">Clothing</option>
                <option value="food">Food</option>
                <option value="electronics">Electronics</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm">Category is required.</p>}
            </div>
            <div className="flex-1">
              <label className="block mb-2">Condition<span className="text-red-500">*</span></label>
              <select {...register("condition", { required: true })} className="w-full p-2 bg-gray-100 border border-gray-300 rounded">
                <option value="">Select condition</option>
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
              {errors.condition && <p className="text-red-500 text-sm">Condition is required.</p>}
            </div>
          </div>

          <label className="block mt-4 mb-2">Quantity<span className="text-red-500">*</span></label>
          <input
            type="number"
            {...register("quantity", { required: true, min: 1 })}
            className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
          />
          {errors.quantity && <p className="text-red-500 text-sm">Quantity must be at least 1.</p>}

          <label className="block mt-4 mb-2">Description</label>
          <textarea
            {...register("description")}
            className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
            rows={3}
          ></textarea>

          <button
            type="submit"
            className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded text-white font-semibold w-full transition-all"
          >
            Next →
          </button>
        </form>
      )}

      {/* Step 2: Upload Images */}
      {step === 2 && (
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
          <label className="block mb-2">Upload Images<span className="text-red-500">*</span></label>
          <div className="border-2 border-dashed p-6 text-center bg-gray-50 rounded-md relative">
            <AiOutlineCloudUpload className="mx-auto text-4xl text-gray-400 mb-2" />
            <p className="text-gray-600">Drag and drop images or click to browse</p>

            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-gray-200 px-4 py-2 rounded mt-4 inline-block"
            >
              Choose Files
            </label>
          </div>

          {/* Image Preview */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            {images.length === 0 ? (
              <p className="col-span-3 text-center text-gray-600">
                <FaRegFileImage className="inline mr-2" />
                No images uploaded yet
              </p>
            ) : (
              images.map((file, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-24 w-24 object-cover rounded-md shadow"
                  />
                  <p className="text-sm text-gray-700 text-center truncate">{file.name}</p>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button onClick={handleBack} className="px-4 py-2 bg-gray-300 rounded text-gray-700">
              ← Back
            </button>
            <button
              onClick={handleNext}
              disabled={images.length === 0}
              className={`px-6 py-2 ${images.length > 0 ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-400 cursor-not-allowed"
                } rounded text-white font-semibold transition-all`}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Pickup Details */}
      {step === 3 && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
          <label className="block mb-2">Pickup Location<span className="text-red-500">*</span></label>
          <input
            type="text"
            {...register("pickupAddress", { required: true })}
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded"
            placeholder="Enter your full address"
          />
          {errors.pickupAddress && <p className="text-red-500 text-sm mt-1">Pickup address is required.</p>}

          <div className="flex gap-4 mt-4">
            <div className="flex-1">
              <label className="block mb-2">Pickup Date</label>
              <input
                type="date"
                {...register("pickupDate")}
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2">Pickup Time</label>
              <input
                type="time"
                {...register("pickupTime")}
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button onClick={handleBack} type="button" className="px-4 py-2 bg-gray-300 rounded text-gray-700">
              ← Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 ${isSubmitting ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
                } rounded text-white font-semibold transition-all`}
            >
              {isSubmitting ? "Submitting..." : "Submit Donation"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Donate;
