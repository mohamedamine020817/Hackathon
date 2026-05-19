import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import SOS from './components/SOS';
import CoverageSimulator from './components/CoverageSimulator';
import ClaimForm from './components/ClaimForm';
import MayaAssistant from './components/MayaAssistant';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = '1'; // Default user for demo

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="loader"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {currentPage === 'dashboard' && <Dashboard user={user} userId={userId} onNavigate={setCurrentPage} />}
        {currentPage === 'sos' && <SOS user={user} userId={userId} />}
        {currentPage === 'coverage' && <CoverageSimulator />}
        {currentPage === 'claim' && <ClaimForm userId={userId} onNavigate={setCurrentPage} />}
        {currentPage === 'maya' && <MayaAssistant userId={userId} />}
      </main>
    </div>
  );
}

export default App;
