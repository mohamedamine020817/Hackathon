import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MobileDashboard-v2.css';

const API_URL = 'http://localhost:5000/api';

export default function MobileDashboard({ user, userId }) {
  const [preventionScore, setPreventionScore] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      const [scoreRes, contractsRes, analyticsRes] = await Promise.all([
        axios.get(`${API_URL}/prevention-score/${userId}`),
        axios.get(`${API_URL}/contracts/${userId}`),
        axios.get(`${API_URL}/analytics/${userId}`)
      ]);

      setPreventionScore(scoreRes.data);
      setContracts(contractsRes.data.contracts);
      setAnalytics(analyticsRes.data.analytics);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (!preventionScore || !analytics) {
    return <div className="mobile-loading">⏳</div>;
  }

  const getScoreColor = (score) => {
    if (score >= 80) return '#27ae60';
    if (score >= 60) return '#f39c12';
    if (score >= 40) return '#e67e22';
    return '#e74c3c';
  };

  return (
    <div className="mobile-dashboard-v2">
      {/* Header */}
      <div className="mobile-header-v2">
        <div className="mobile-user-greeting">
          <span className="greeting-emoji">👋</span>
          <h1>{user?.name?.split(' ')[0]}</h1>
        </div>
        <div className="mobile-user-level">
          <span className="level-badge">{user?.level}</span>
          <span className="level-xp">{user?.xp} XP</span>
        </div>
      </div>

      {/* Score de Prévention - Mini Card */}
      <div className="mobile-score-mini">
        <div className="score-display">
          <svg className="score-svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" className="score-bg" />
            <circle
              cx="50"
              cy="50"
              r="45"
              className="score-fill"
              style={{
                stroke: getScoreColor(preventionScore.score),
                strokeDasharray: `${2.827 * preventionScore.score} 282.7`
              }}
            />
          </svg>
          <div className="score-text">
            <span className="score-num">{preventionScore.score}</span>
            <span className="score-label">Score</span>
          </div>
        </div>

        <div className="score-mini-info">
          <div className="info-row">
            <span className="info-label">Risque</span>
            <span className="info-value">{preventionScore.riskLevel}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Tendance</span>
            <span className="info-value">
              {preventionScore.trend === 'up' ? '📈' : preventionScore.trend === 'down' ? '📉' : '➡️'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mobile-quick-stats">
        <div className="stat-chip">
          <span className="stat-icon">📋</span>
          <div className="stat-info">
            <span className="stat-value">{analytics.totalContracts}</span>
            <span className="stat-label">Contrats</span>
          </div>
        </div>
        <div className="stat-chip">
          <span className="stat-icon">💰</span>
          <div className="stat-info">
            <span className="stat-value">{analytics.totalPremiums}DT</span>
            <span className="stat-label">Primes</span>
          </div>
        </div>
        <div className="stat-chip">
          <span className="stat-icon">📊</span>
          <div className="stat-info">
            <span className="stat-value">{analytics.avgCoverage}%</span>
            <span className="stat-label">Couvert</span>
          </div>
        </div>
      </div>

      {/* Contracts Section */}
      <div className="mobile-section">
        <h3 className="section-title">Contrats Actifs</h3>
        <div className="mobile-contracts-list">
          {contracts.map(contract => (
            <div key={contract.id} className="mobile-contract-item">
              <div className="mobile-contract-icon">
                {contract.type === 'auto' && '🚗'}
                {contract.type === 'home' && '🏠'}
                {contract.type === 'health' && '🏥'}
                {contract.type === 'travel' && '✈️'}
              </div>
              <div className="mobile-contract-info">
                <h4>{contract.type.toUpperCase()}</h4>
                <div className="contract-quick-info">
                  <span>{contract.premium}DT</span>
                  <span>•</span>
                  <span>{contract.coverage}%</span>
                </div>
              </div>
              <div className="mobile-contract-status">
                <span className={`contract-badge ${contract.status}`}>
                  ✓
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score Breakdown - Compact */}
      <div className="mobile-section">
        <h3 className="section-title">Composantes du Score</h3>
        <div className="mobile-breakdown-compact">
          {Object.entries(preventionScore.breakdown).slice(0, 3).map(([key, value]) => (
            <div key={key} className="breakdown-bar">
              <div className="breakdown-fill" style={{ width: `${value}%` }}></div>
              <span className="breakdown-pct">{value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mobile-quick-actions">
        <button className="mobile-action-mini">
          <span>🆘</span>
          <span>SOS</span>
        </button>
        <button className="mobile-action-mini">
          <span>📝</span>
          <span>Sinistre</span>
        </button>
        <button className="mobile-action-mini">
          <span>📊</span>
          <span>Simuler</span>
        </button>
      </div>

      {/* Spacer for bottom nav */}
      <div className="mobile-bottom-spacer"></div>
    </div>
  );
}
