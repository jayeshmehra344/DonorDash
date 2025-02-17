
import React, { useState } from 'react';
import { Upload, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SkinAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <div className="container fade-in">
      <button 
        className="button" 
        onClick={() => navigate('/')}
        style={{ marginBottom: '1rem' }}
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <div className="upload-container">
        <div className="upload-section">
          <h2>Upload Image</h2>
          <div
            className="dropzone"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <Upload size={48} color="var(--accent)" style={{ marginBottom: '1rem' }} />
            <p>Drag and drop your image here or</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              id="file-upload"
            />
            <label htmlFor="file-upload" className="button" style={{ marginTop: '1rem' }}>
              Choose File
            </label>
          </div>
        </div>

        <div className="result-section">
          <h2>Analysis Results</h2>
          {selectedImage ? (
            <div style={{ marginTop: '2rem' }}>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                style={{ maxWidth: '100%', borderRadius: '12px' }}
              />
              <div style={{ marginTop: '2rem' }}>
                <h3>Detected Condition</h3>
                <p style={{ marginTop: '1rem', color: 'var(--secondary)' }}>
                  Upload an image to receive a detailed analysis of any skin conditions.
                </p>
                <button className="button" style={{ marginTop: '2rem' }}>
                  Find more via Tecura AI
                </button>
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--secondary)', marginTop: '2rem' }}>
              Upload an image to see the analysis results here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkinAnalysis;
