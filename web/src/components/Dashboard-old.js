import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const API_URL = 'http://localhost:5000/api';

export default function Dashboard({ user, userId, onNavigate }) {
  const [preventionScore, setPreventionScore] = useState(null);
  const [badges, setBadges] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchDashboardData();
  }, [userId]);

  const fetchDashboardData = async () => {
    try {
      const [scoreRes, badgesRes, alertsRes] = await Promise.all([
        axios.get(`${API_URL}/prevention-score/${userId}`),
        axios.get(`${API_URL}/badges`),
        axios.get(`${API_URL}/alerts/${userId}`)
      ]);

      setPreventionScore(scoreRes.data);
      setBadges(badgesRes.data.badges);
      setAlerts(alertsRes.data.alerts);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#27ae60';
    if (score >= 60) return '#f39c12';
    return '#e74c3c';
  };

  const handleAlertRead = async (alertId) => {
    try {
      await axios.post(`${API_URL}/alerts/mark-read`, { alertId });
      fetchDashboardData();
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="greeting">
          <h1>Bienvenue, {user?.name.split(' ')[0]} 👋</h1>
          <p>Votre compagnon d'assurance intelligent</p>
        </div>
        <div className="profile-quick">
          <div className="xp-badge">
            <p>{user?.xp} XP</p>
            <p className="level">{user?.level}</p>
          </div>
        </div>
      </div>

      {/* Prevention Score Card */}
      {preventionScore && (
        <div className="score-card">
          <div className="score-header">
            <h2>Votre Score de Prévention</h2>
            <span className="score-status">🎯 {preventionScore.trend === 'up' ? '↗️' : '↘️'}</span>
          </div>
          <div className="score-circle">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={getScoreColor(preventionScore.score)}
                strokeWidth="8"
                strokeDasharray={`${(preventionScore.score / 100) * 282.7} 282.7`}
                style={{ transition: 'stroke-dasharray 0.5s ease' }}
              />
              <text x="50" y="55" textAnchor="middle" fontSize="28" fontWeight="bold" fill={getScoreColor(preventionScore.score)}>
                {preventionScore.score}
              </text>
            </svg>
          </div>
          <div className="score-breakdown">
            <div className="breakdown-item">
              <span>Historique sinistres</span>
              <p>{preventionScore.breakdown.claimsHistory}%</p>
            </div>
            <div className="breakdown-item">
              <span>Comportement</span>
              <p>{preventionScore.breakdown.profileBehavior}%</p>
            </div>
            <div className="breakdown-item">
              <span>Niveau couverture</span>
              <p>{preventionScore.breakdown.coverageLevel}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Alerts Section */}
      <div className="alerts-section">
        <h2>⚠️ Alertes & Recommandations</h2>
        <div className="alerts-list">
          {alerts.length > 0 ? (
            alerts.map(alert => (
              <div key={alert.id} className={`alert-item ${alert.severity}`}>
                <div className="alert-content">
                  <h3>{alert.title}</h3>
                  <p>{alert.message}</p>
                </div>
                <button
                  className="alert-close"
                  onClick={() => handleAlertRead(alert.id)}
                >
                  ✓
                </button>
              </div>
            ))
          ) : (
            <p className="no-alerts">Aucune alerte actuellement</p>
          )}
        </div>
      </div>

      {/* Contracts Overview */}
      <div className="contracts-section">
        <h2>📋 Vos Contrats</h2>
        <div className="contracts-grid">
          {user?.contracts?.map(contract => (
            <div key={contract.id} className="contract-card">
              <div className="contract-header">
                <h3>{contract.type}</h3>
                <span className={`status ${contract.status}`}>{contract.status}</span>
              </div>
              <div className="contract-details">
                <p><strong>Prime:</strong> {contract.premium.toFixed(2)} DT</p>
                <p><strong>Couverture:</strong> {contract.coverage}%</p>
                <p><strong>Fin:</strong> {new Date(contract.endDate).toLocaleDateString('fr-FR')}</p>
              </div>
              <div className="guarantees">
                {contract.guarantees?.map((g, i) => (
                  <span key={i} className="guarantee-badge">{g}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Section */}
      <div className="badges-section">
        <h2>🏆 Badges Débloqués</h2>
        <div className="badges-grid">
          {badges.map(badge => (
            <div key={badge.id} className="badge-item">
              <span className="badge-icon">{badge.icon}</span>
              <h4>{badge.name}</h4>
              <p>{badge.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Actions Rapides</h2>
        <div className="actions-grid">
          <button className="action-btn" onClick={() => onNavigate('sos')}>
            🆘 Urgence SOS
          </button>
          <button className="action-btn" onClick={() => onNavigate('claim')}>
            📝 Déclarer Sinistre
          </button>
          <button className="action-btn" onClick={() => onNavigate('coverage')}>
            📊 Simuler Couverture
          </button>
          <button className="action-btn" onClick={() => onNavigate('maya')}>
            💬 Discuter avec Maya
          </button>
        </div>
      </div>
    </div>
  );
}
