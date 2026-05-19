import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SOS.css';

const API_URL = 'http://localhost:5000/api';

export default function SOS({ user, userId }) {
  const [emergency, setEmergency] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState('accident');
  const [sosActivated, setSosActivated] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchEmergencyData();
  }, [userId]);

  const fetchEmergencyData = async () => {
    try {
      const response = await axios.get(`${API_URL}/sos-emergency/${userId}`);
      setEmergency(response.data.emergency);
    } catch (error) {
      console.error('Error fetching emergency data:', error);
    }
  };

  const handleSOSClick = () => {
    setSosActivated(true);
    setTimeout(() => {
      alert(`🚨 SOS Activé!\n\nAppel passé à: ${emergency?.emergencyNumber}\nVotre localisation a été partagée.\n\nAide en arrivée dans 5-10 minutes.`);
      setSosActivated(false);
    }, 1000);
  };

  if (!emergency) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="sos-page">
      <div className="sos-header">
        <h1>🆘 Assistance d'Urgence</h1>
        <p>Accès immédiat aux services d'secours et d'assistance</p>
      </div>

      {/* Big SOS Button */}
      <div className="sos-button-container">
        <button
          className={`sos-button ${sosActivated ? 'activated' : ''}`}
          onClick={handleSOSClick}
        >
          <span className="sos-text">APPUYER<br />POUR<br />SOS</span>
          <span className="pulse"></span>
        </button>
      </div>

      {/* Emergency Contact */}
      <div className="emergency-contact">
        <h2>📞 Contacts d'Urgence</h2>
        <div className="contact-card primary">
          <h3>MAE Assurances - Urgence</h3>
          <p className="phone">{emergency.emergencyNumber}</p>
          <button className="call-btn">📞 Appeler</button>
        </div>
      </div>

      {/* Personal Info */}
      <div className="personal-info">
        <h2>👤 Vos Informations</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Nom</span>
            <p>{emergency.name}</p>
          </div>
          <div className="info-item">
            <span className="label">Téléphone</span>
            <p>{emergency.phone}</p>
          </div>
          <div className="info-item">
            <span className="label">Localisation</span>
            <p>{emergency.location}</p>
          </div>
        </div>
      </div>

      {/* Nearest Health Center */}
      <div className="nearest-center">
        <h2>🏥 Centre Médical le Plus Proche</h2>
        <div className="center-card">
          <h3>{emergency.nearestHealthCenter.name}</h3>
          <p><strong>Distance:</strong> {emergency.nearestHealthCenter.distance}</p>
          <p><strong>Téléphone:</strong> {emergency.nearestHealthCenter.phone}</p>
          <button className="direction-btn">📍 Directions</button>
        </div>
      </div>

      {/* Emergency Guides */}
      <div className="emergency-guides">
        <h2>📋 Guide d'Action</h2>
        <div className="guide-tabs">
          {Object.keys(emergency.guide).map(key => (
            <button
              key={key}
              className={`guide-tab ${selectedGuide === key ? 'active' : ''}`}
              onClick={() => setSelectedGuide(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
        <div className="guide-content">
          <div className="step-by-step">
            <p className="instruction">{emergency.guide[selectedGuide]}</p>
          </div>
        </div>
      </div>

      {/* Contracts Info */}
      <div className="contracts-info">
        <h2>📋 Vos Contrats Actifs</h2>
        <div className="contracts-list">
          {emergency.contracts.map(contract => (
            <div key={contract.id} className="contract-item">
              <h4>{contract.type}</h4>
              <p>{contract.guarantees.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
