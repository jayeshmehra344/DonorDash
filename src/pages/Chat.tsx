
import React, { useState } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle message sending logic here
      setMessage('');
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

      <div className="chat-container">
        <div className="chat-messages">
          {/* Chat messages will be rendered here */}
        </div>

        <form onSubmit={handleSend} className="chat-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: '0.8rem',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              outline: 'none',
            }}
          />
          <button className="button" type="submit">
            <Send size={18} />
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
