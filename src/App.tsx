import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Home from './components/Home';
import HowItWorks from './components/ui/howitworks'; 
import Donate from './components/Donate'; 
import Charities from './components/Charities'; 
import Login from './components/Login'; 
import GetStarted from './components/ui/GetStarted'; 
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/charities" element={<Charities />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/get-started" element={<GetStarted />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;