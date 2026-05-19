import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MobileDashboard.css';

const API_URL = 'http://localhost:5000/api';

export default function MobileDashboard({ user, userId }) {
  const [preventionScore, setPreventionScore] = useState(null);
  const [alerts, setAlerts] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      const [scoreRes, alertsRes] = await Promise.all([
        axios.get(`${API_URL}/prevention-score/${userId}`),
        axios.get(`${API_URL}/alerts/${userId}`)
      ]);
      setPreventionScore(scoreRes.data);
      setAlerts(alertsRes.data.alerts.slice(0, 2));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#27ae60';
    if (score >= 60) return '#f39c12';
    return '#e74c3c';
  };

  return (
    <div className="mobile-dashboard">
      {/* Header */}
      <div className="mobile-header">
        <h1>💚 InsurSmart</h1>
        <div className="user-info">
          <div className="avatar">👤</div>
          <div>
            <p className="user-name">{user?.name.split(' ')[0]}</p>
            <p className="user-level">{user?.level}</p>
          </div>
        </div>
      </div>

      {/* Score Card */}
      {preventionScore && (
        <div className="mobile-score-card">
          <div className="score-mini-circle">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" strokeWidth="6" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={getScoreColor(preventionScore.score)}
                strokeWidth="6"
                strokeDasharray={`${(preventionScore.score / 100) * 282.7} 282.7`}
              />
              <text x="50" y="55" textAnchor="middle" fontSize="24" fontWeight="bold" fill={getScoreColor(preventionScore.score)}>
                {preventionScore.score}
              </text>
            </svg>
          </div>
          <div className="score-info">
            <p className="score-label">Score de Prévention</p>
            <p className="score-value">{preventionScore.score}/100</p>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mobile-stats">
        <div className="stat-item">
          <span className="stat-icon">✨</span>
          <p className="stat-label">XP</p>
          <p className="stat-value">{user?.xp}</p>
        </div>
        <div className="stat-item">
          <span className="stat-icon">📋</span>
          <p className="stat-label">Contrats</p>
          <p className="stat-value">{user?.contracts?.length || 0}</p>
        </div>
        <div className="stat-item">
          <span className="stat-icon">📢</span>
          <p className="stat-label">Alertes</p>
          <p className="stat-value">{alerts?.length || 0}</p>
        </div>
      </div>

      {/* Alerts Preview */}
      {alerts.length > 0 && (
        <div className="mobile-alerts-preview">
          <h2>⚠️ Alertes</h2>
          {alerts.map(alert => (
            <div key={alert.id} className={`alert-card ${alert.severity}`}>
              <h3>{alert.title}</h3>
              <p>{alert.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Contracts */}
      <div className="mobile-contracts">
        <h2>📋 Contrats</h2>
        {user?.contracts?.slice(0, 2).map(contract => (
          <div key={contract.id} className="mobile-contract-card">
            <div className="contract-header">
              <h3>{contract.type}</h3>
              <span className="coverage">{contract.coverage}%</span>
            </div>
            <p className="contract-premium">{contract.premium.toFixed(2)} DT/mois</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mobile-actions">
        <button className="action-btn large">🆘 SOS</button>
        <button className="action-btn">📝 Sinistre</button>
        <button className="action-btn">📊 Simuler</button>
      </div>
    </div>
  );
}
