import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MobileAlerts.css';

const API_URL = 'http://localhost:5000/api';

export default function MobileAlerts({ userId }) {
  const [alerts, setAlerts] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchAlerts();
  }, [userId]);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get(`${API_URL}/alerts/${userId}`);
      setAlerts(response.data.alerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const handleMarkRead = async (alertId) => {
    try {
      await axios.post(`${API_URL}/alerts/mark-read`, { alertId });
      setAlerts(prev => prev.filter(a => a.id !== alertId));
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };

  return (
    <div className="mobile-alerts">
      <div className="alerts-header">
        <h1>⚠️ Alertes & Notifications</h1>
      </div>

      {alerts.length > 0 ? (
        <div className="alerts-list">
          {alerts.map(alert => (
            <div key={alert.id} className={`alert-notification ${alert.severity}`}>
              <div className="alert-icon">
                {alert.severity === 'high' ? '🔴' : alert.severity === 'medium' ? '🟡' : '🟢'}
              </div>
              <div className="alert-body">
                <h3>{alert.title}</h3>
                <p>{alert.message}</p>
                <p className="alert-time">
                  {new Date(alert.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <button
                className="alert-dismiss"
                onClick={() => handleMarkRead(alert.id)}
              >
                ✓
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-alerts">
          <p>✨ Aucune alerte pour le moment</p>
          <p>Tout va bien!</p>
        </div>
      )}

      <div className="alerts-tips">
        <h2>💡 Conseils de Prévention</h2>
        <div className="tip-card">
          <span className="tip-icon">🌧️</span>
          <p>Vérifiez la météo avant les sorties importantes</p>
        </div>
        <div className="tip-card">
          <span className="tip-icon">🏠</span>
          <p>Mettez à jour votre profil lors de changements</p>
        </div>
        <div className="tip-card">
          <span className="tip-icon">🚗</span>
          <p>Conduisez prudemment pour augmenter votre score</p>
        </div>
        <div className="tip-card">
          <span className="tip-icon">📋</span>
          <p>Conservez vos documents d'assurance à portée</p>
        </div>
      </div>
    </div>
  );
}
