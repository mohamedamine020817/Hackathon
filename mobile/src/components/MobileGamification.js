import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MobileGamification.css';

const API_URL = 'http://localhost:5000/api';

export default function MobileGamification({ user, userId }) {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    fetchBadges();
  }, [userId]);

  const fetchBadges = async () => {
    try {
      const response = await axios.get(`${API_URL}/badges`);
      setBadges(response.data.badges);
    } catch (error) {
      console.error('Error fetching badges:', error);
    }
  };

  const handleAddXP = async (points, action) => {
    try {
      await axios.post(`${API_URL}/xp/add`, {
        userId,
        points,
        action
      });
      // Refetch user data
      window.location.reload();
    } catch (error) {
      console.error('Error adding XP:', error);
    }
  };

  return (
    <div className="mobile-gamification">
      <div className="gamification-header">
        <h1>🏆 Récompenses & Badges</h1>
      </div>

      {/* XP Progress */}
      <div className="xp-progress-card">
        <div className="level-info">
          <h2>Niveau: {user?.level}</h2>
          <p className="xp-count">{user?.xp} XP</p>
        </div>
        <div className="level-meter">
          <div className="xp-bar" style={{ width: `${Math.min((user?.xp / 1000) * 100, 100)}%` }}></div>
        </div>
        <div className="level-goals">
          <span>Bronze</span>
          <span>Argent</span>
          <span>Or</span>
          <span>Platine</span>
        </div>
      </div>

      {/* Badges */}
      <div className="badges-section">
        <h2>🏅 Badges Obtenus</h2>
        <div className="badges-grid">
          {badges.map(badge => (
            <div key={badge.id} className="badge-card">
              <span className="badge-icon">{badge.icon}</span>
              <h3>{badge.name}</h3>
              <p>{badge.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick XP Actions */}
      <div className="xp-actions">
        <h2>💪 Gagnez des XP</h2>
        <button className="action-card" onClick={() => handleAddXP(25, 'Mise à jour profil')}>
          <span className="action-icon">👤</span>
          <p>Mettre à jour Profil</p>
          <p className="xp-reward">+25 XP</p>
        </button>
        <button className="action-card" onClick={() => handleAddXP(15, 'Lecture conseil')}>
          <span className="action-icon">📚</span>
          <p>Lire un Conseil</p>
          <p className="xp-reward">+15 XP</p>
        </button>
        <button className="action-card" onClick={() => handleAddXP(50, 'Déclaration rapide')}>
          <span className="action-icon">⚡</span>
          <p>Déclaration Rapide</p>
          <p className="xp-reward">+50 XP</p>
        </button>
      </div>

      {/* Leaderboard */}
      <div className="leaderboard">
        <h2>🥇 Top Adhérents</h2>
        <div className="leaderboard-item">
          <span className="rank">1</span>
          <p className="name">Ahmed Hamza</p>
          <p className="xp">1850 XP</p>
        </div>
        <div className="leaderboard-item">
          <span className="rank">2</span>
          <p className="name">{user?.name}</p>
          <p className="xp">{user?.xp} XP</p>
        </div>
        <div className="leaderboard-item">
          <span className="rank">3</span>
          <p className="name">Fatima Dhouib</p>
          <p className="xp">1200 XP</p>
        </div>
      </div>
    </div>
  );
}
