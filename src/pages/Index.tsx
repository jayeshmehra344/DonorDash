
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Image, User } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="container fade-in">
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome to Your Health Portal</h1>
        <p style={{ color: 'var(--secondary)', fontSize: '1.1rem' }}>
          Professional mental health support and skin condition analysis
        </p>
      </header>

      <div className="dashboard">
        <div className="card" onClick={() => navigate('/chat')} style={{ animationDelay: '0.1s' }}>
          <MessageSquare size={32} color="var(--accent)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ marginBottom: '0.5rem' }}>Mental Health Support</h2>
          <p style={{ color: 'var(--secondary)' }}>
            Connect with our professional counselors in a peaceful environment
          </p>
        </div>

        <div className="card" onClick={() => navigate('/skin-analysis')} style={{ animationDelay: '0.2s' }}>
          <Image size={32} color="var(--accent)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ marginBottom: '0.5rem' }}>Skin Analysis</h2>
          <p style={{ color: 'var(--secondary)' }}>
            Upload images for professional skin condition analysis
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
