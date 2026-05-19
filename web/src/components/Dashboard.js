import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const API_URL = 'http://localhost:5000/api';

export default function Dashboard({ user, userId, onNavigate }) {
  const [preventionScore, setPreventionScore] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchDashboardData();
  }, [userId]);

  const fetchDashboardData = async () => {
    try {
      const [scoreRes, contractsRes, alertsRes, analyticsRes] = await Promise.all([
        axios.get(`${API_URL}/prevention-score/${userId}`),
        axios.get(`${API_URL}/contracts/${userId}`),
        axios.get(`${API_URL}/alerts/${userId}`),
        axios.get(`${API_URL}/analytics/${userId}`)
      ]);

      setPreventionScore(scoreRes.data);
      setContracts(contractsRes.data.contracts);
      setAlerts(alertsRes.data.alerts);
      setAnalytics(analyticsRes.data.analytics);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const getRiskColor = (riskLevel) => {
    const colors = {
      low: '#2d8659',
      medium: '#f39c12',
      high: '#e74c3c',
      critical: '#c0392b'
    };
    return colors[riskLevel] || '#95a5a6';
  };

  const getScoreGradient = (score) => {
    if (score >= 80) return 'grad-excellent';
    if (score >= 60) return 'grad-good';
    if (score >= 40) return 'grad-fair';
    return 'grad-poor';
  };

  if (!preventionScore || !analytics) {
    return <div className="loading">Chargement du dashboard...</div>;
  }

  return (
    <div className="dashboard">
      {/* Header avec profil */}
      <div className="dashboard-header">
        <div className="profile-section">
          <img
            src={user?.profilePicture}
            alt={user?.name}
            className="profile-avatar"
          />
          <div className="profile-info">
            <h1>Bienvenue, {user?.name}! 👋</h1>
            <p className="location">📍 {user?.location}</p>
          </div>
        </div>
      </div>

      {/* Tabs de navigation */}
      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Vue d'ensemble
        </button>
        <button
          className={`tab-btn ${activeTab === 'contracts' ? 'active' : ''}`}
          onClick={() => setActiveTab('contracts')}
        >
          📋 Contrats ({contracts.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('alerts')}
        >
          ⚠️ Alertes ({alerts.length})
        </button>
      </div>

      {/* TAB: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="dashboard-content overview-tab">
          {/* Score de Prévention - Carte Principale */}
          <div className={`score-card ${getScoreGradient(preventionScore.score)}`}>
            <div className="score-content">
              <h2>Score de Prévention</h2>
              
              <div className="score-circle">
                <svg viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    className="circle-bg"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    className="circle-progress"
                    style={{
                      strokeDasharray: `${2.827 * preventionScore.score} 282.7`
                    }}
                  />
                </svg>
                <div className="score-value">
                  <span className="number">{preventionScore.score}</span>
                  <span className="label">/100</span>
                </div>
              </div>

              <div className="score-details">
                <div className="detail-item">
                  <span className="label">Niveau</span>
                  <span className="value">{user?.level}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Risque</span>
                  <span
                    className="value risk"
                    style={{ color: getRiskColor(preventionScore.riskLevel) }}
                  >
                    {preventionScore.riskLevel.toUpperCase()}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="label">Tendance</span>
                  <span className={`value trend trend-${preventionScore.trend}`}>
                    {preventionScore.trend === 'up' ? '📈' : preventionScore.trend === 'down' ? '📉' : '➡️'}
                  </span>
                </div>
              </div>

              <div className="score-breakdown">
                <h3>Décomposition du Score</h3>
                {Object.entries(preventionScore.breakdown).map(([key, value]) => (
                  <div key={key} className="breakdown-item">
                    <span className="breakdown-label">
                      {key === 'claimsHistory' && 'Historique Sinistres'}
                      {key === 'contractCoverage' && 'Couverture'}
                      {key === 'behaviorRating' && 'Comportement'}
                      {key === 'appEngagement' && 'Engagement'}
                      {key === 'timeAsCustomer' && 'Ancienneté'}
                    </span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${value}%` }}></div>
                    </div>
                    <span className="breakdown-value">{value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <h3>{analytics.totalContracts}</h3>
              <p>Contrats Actifs</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <h3>{analytics.totalPremiums.toFixed(2)} DT</h3>
              <p>Primes Annuelles</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <h3>{analytics.claimsCount}</h3>
              <p>Sinistres</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <h3>{analytics.xp}</h3>
              <p>Points XP</p>
            </div>
          </div>

          {/* Boutons d'action rapides */}
          <div className="quick-actions">
            <h3>Actions Rapides</h3>
            <div className="actions-grid">
              <button
                className="action-btn"
                onClick={() => onNavigate('claim')}
              >
                <span className="icon">📝</span>
                <span className="text">Déclarer Sinistre</span>
              </button>
              <button
                className="action-btn"
                onClick={() => onNavigate('coverage')}
              >
                <span className="icon">📊</span>
                <span className="text">Simuler Couverture</span>
              </button>
              <button
                className="action-btn"
                onClick={() => onNavigate('sos')}
              >
                <span className="icon">🆘</span>
                <span className="text">Urgence SOS</span>
              </button>
              <button
                className="action-btn"
                onClick={() => onNavigate('maya')}
              >
                <span className="icon">🤖</span>
                <span className="text">Chat Maya IA</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB: CONTRACTS */}
      {activeTab === 'contracts' && (
        <div className="dashboard-content contracts-tab">
          <h2>Vos Contrats d'Assurance</h2>
          <div className="contracts-list">
            {contracts.map(contract => (
              <div key={contract.id} className="contract-card">
                <div className="contract-header">
                  <div className="contract-type">
                    {contract.type === 'auto' && '🚗'}
                    {contract.type === 'home' && '🏠'}
                    {contract.type === 'health' && '🏥'}
                    {contract.type === 'travel' && '✈️'}
                    <span>{contract.type.toUpperCase()}</span>
                  </div>
                  <span className={`status status-${contract.status}`}>
                    {contract.status === 'active' ? '✓ Actif' : contract.status}
                  </span>
                </div>
                <div className="contract-body">
                  <div className="contract-row">
                    <span className="label">Prime Annuelle:</span>
                    <span className="value">{contract.premium} DT</span>
                  </div>
                  <div className="contract-row">
                    <span className="label">Couverture:</span>
                    <span className="value">{contract.coverage}%</span>
                  </div>
                  <div className="contract-row">
                    <span className="label">Garanties:</span>
                    <span className="value">{contract.guarantees.join(', ')}</span>
                  </div>
                  <div className="coverage-progress">
                    <div className="progress-fill" style={{ width: `${contract.coverage}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: ALERTS */}
      {activeTab === 'alerts' && (
        <div className="dashboard-content alerts-tab">
          <h2>Alertes et Notifications</h2>
          <div className="alerts-list">
            {alerts.length > 0 ? (
              alerts.map(alert => (
                <div
                  key={alert.id}
                  className={`alert-item alert-${alert.severity}`}
                >
                  <div className="alert-icon">
                    {alert.severity === 'high' && '🔴'}
                    {alert.severity === 'medium' && '🟡'}
                    {alert.severity === 'low' && '🟢'}
                  </div>
                  <div className="alert-content">
                    <h4>{alert.title}</h4>
                    <p>{alert.message}</p>
                  </div>
                  <div className="alert-category">{alert.category}</div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>✅ Vous n'avez aucune alerte pour le moment</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
