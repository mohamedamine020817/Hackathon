import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppMobile.css';
import MobileNavigation from './components/MobileNavigation';
import MobileDashboard from './components/MobileDashboard';
import MobileAlerts from './components/MobileAlerts';
import MobileGamification from './components/MobileGamification';

const API_URL = 'http://localhost:5000/api';

function AppMobile() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = '2'; // Different user for mobile demo

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
      <div className="mobile-app">
        <div className="mobile-loading">
          <div className="mobile-loader"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-app">
      <div className="mobile-status-bar"></div>
      
      <div className="mobile-content">
        {currentPage === 'home' && <MobileDashboard user={user} userId={userId} />}
        {currentPage === 'alerts' && <MobileAlerts user={user} userId={userId} />}
        {currentPage === 'badges' && <MobileGamification user={user} userId={userId} />}
      </div>

      <MobileNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default AppMobile;
