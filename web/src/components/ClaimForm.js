import React, { useState } from 'react';
import axios from 'axios';
import './ClaimForm.css';

const API_URL = 'http://localhost:5000/api';

export default function ClaimForm({ userId, onNavigate }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    claimType: '',
    description: '',
    photos: []
  });
  const [submitted, setSubmitted] = useState(false);
  const [claim, setClaim] = useState(null);

  const claimTypes = [
    { value: 'accident', label: '🚗 Accident Automobile', icon: '🚗' },
    { value: 'theft', label: '🔓 Vol', icon: '🔓' },
    { value: 'flood', label: '💧 Dégâts des Eaux', icon: '💧' },
    { value: 'fire', label: '🔥 Incendie', icon: '🔥' },
    { value: 'medical', label: '🏥 Urgence Médicale', icon: '🏥' }
  ];

  const handleClaimTypeSelect = (type) => {
    setFormData(prev => ({
      ...prev,
      claimType: type
    }));
    setStep(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_URL}/claim/declare`, {
        userId,
        claimType: formData.claimType,
        description: formData.description,
        photos: formData.photos
      });
      setClaim(response.data.claim);
      setSubmitted(true);
      
      // Add XP for quick claim
      await axios.post(`${API_URL}/xp/add`, {
        userId,
        points: 50,
        action: 'Déclaration rapide de sinistre'
      });
    } catch (error) {
      console.error('Error submitting claim:', error);
    }
  };

  if (submitted && claim) {
    return (
      <div className="claim-page">
        <div className="success-message">
          <div className="success-icon">✅</div>
          <h1>Sinistre Déclaré avec Succès!</h1>
          <p>Merci de nous avoir signalé rapidement. Voici votre numéro de dossier:</p>
          <div className="claim-id">{claim.id.substring(0, 8).toUpperCase()}</div>
          
          <div className="claim-details">
            <h2>Suivi de Votre Dossier</h2>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${claim.progress}%` }}>
                {claim.progress}%
              </div>
            </div>
            <div className="timeline">
              <div className="timeline-item completed">
                <div className="timeline-dot"></div>
                <h3>Déclaration Reçue</h3>
                <p>{new Date(claim.createdAt).toLocaleString('fr-FR')}</p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <h3>En Cours de Traitement</h3>
                <p>24-48 heures</p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <h3>Décision</h3>
                <p>Avant {new Date(claim.estimatedResolution).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn primary" onClick={() => onNavigate('dashboard')}>
              📊 Retour au Dashboard
            </button>
            <button className="btn secondary" onClick={() => window.print()}>
              🖨️ Imprimer Reçu
            </button>
          </div>

          <p className="support-text">
            Besoin d'aide? Contactez notre support: <strong>+216 25 000 111</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="claim-page">
      <div className="claim-header">
        <h1>📝 Déclarer un Sinistre</h1>
        <p>Processus rapide et simple - moins de 5 minutes</p>
      </div>

      <div className="claim-form">
        {step === 1 && (
          <div className="step-1">
            <h2>Quel type de sinistre déclarez-vous?</h2>
            <div className="claim-types-grid">
              {claimTypes.map(type => (
                <button
                  key={type.value}
                  className="claim-type-btn"
                  onClick={() => handleClaimTypeSelect(type.value)}
                >
                  <span className="icon">{type.icon}</span>
                  <span className="label">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && formData.claimType && (
          <div className="step-2">
            <div className="progress-indicator">
              <div className="step-indicator completed">1</div>
              <div className="step-connector"></div>
              <div className="step-indicator active">2</div>
            </div>

            <h2>Décrivez votre sinistre</h2>
            <p>Plus les détails sont précis, plus rapide sera le traitement</p>

            <div className="form-group">
              <label>Description du sinistre</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Décrivez ce qui s'est passé en détail..."
                rows="6"
              ></textarea>
            </div>

            <div className="form-group">
              <label>Joindre des Photos (optionnel)</label>
              <div className="file-upload">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="upload-label">
                  📸 Cliquez ou glissez des photos
                </label>
              </div>
              {formData.photos.length > 0 && (
                <div className="photos-preview">
                  <p>{formData.photos.length} photo(s) ajoutée(s)</p>
                </div>
              )}
            </div>

            <div className="action-buttons">
              <button className="btn secondary" onClick={() => {
                setStep(1);
                setFormData({ ...formData, claimType: '' });
              }}>
                ← Retour
              </button>
              <button
                className="btn primary"
                onClick={handleSubmit}
                disabled={!formData.description.trim()}
              >
                ✓ Envoyer Déclaration
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="info-box">
        <h3>💡 Conseils</h3>
        <ul>
          <li>Soyez précis dans votre description</li>
          <li>Joignez des photos pour accélérer le traitement</li>
          <li>Conservez tous les documents justificatifs</li>
          <li>Déclarez rapidement pour une meilleure prise en charge</li>
        </ul>
      </div>
    </div>
  );
}
