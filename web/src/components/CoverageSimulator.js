import React, { useState } from 'react';
import axios from 'axios';
import './CoverageSimulator.css';

const API_URL = 'http://localhost:5000/api';

export default function CoverageSimulator() {
  const [formData, setFormData] = useState({
    contractType: 'auto',
    estimatedAmount: 5000,
    currentCoverage: 70
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const contractTypes = [
    { value: 'auto', label: 'Assurance Auto' },
    { value: 'home', label: 'Assurance Habitation' },
    { value: 'health', label: 'Assurance Santé' },
    { value: 'travel', label: 'Assurance Voyage' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'contractType' ? value : parseFloat(value)
    }));
  };

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/coverage-simulation`, formData);
      setResult(response.data.simulation);
    } catch (error) {
      console.error('Error simulating coverage:', error);
    } finally {
      setLoading(false);
    }
  };

  const improvementPercentage = () => {
    if (!result) return 0;
    const targetCoverage = Math.min(formData.currentCoverage + 20, 100);
    const improvement = ((targetCoverage - formData.currentCoverage) / formData.currentCoverage) * 100;
    return improvement.toFixed(1);
  };

  return (
    <div className="coverage-simulator">
      <div className="simulator-header">
        <h1>📊 Simulateur de Couverture</h1>
        <p>Testez différentes configurations et optimisez votre couverture</p>
      </div>

      <div className="simulator-container">
        <div className="input-section">
          <div className="form-group">
            <label>Type de Contrat</label>
            <select
              name="contractType"
              value={formData.contractType}
              onChange={handleInputChange}
            >
              {contractTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Montant Estimé du Sinistre (DT)</label>
            <div className="slider-container">
              <input
                type="range"
                name="estimatedAmount"
                min="1000"
                max="50000"
                step="1000"
                value={formData.estimatedAmount}
                onChange={handleInputChange}
                className="slider"
              />
              <input
                type="number"
                name="estimatedAmount"
                value={formData.estimatedAmount}
                onChange={handleInputChange}
                className="number-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Niveau de Couverture (%)</label>
            <div className="slider-container">
              <input
                type="range"
                name="currentCoverage"
                min="0"
                max="100"
                step="5"
                value={formData.currentCoverage}
                onChange={handleInputChange}
                className="slider"
              />
              <span className="coverage-value">{formData.currentCoverage}%</span>
            </div>
          </div>

          <button
            className="simulate-btn"
            onClick={handleSimulate}
            disabled={loading}
          >
            {loading ? 'Calcul en cours...' : '🎯 Simuler'}
          </button>
        </div>

        {result && (
          <div className="result-section">
            <h2>📈 Résultats de la Simulation</h2>

            <div className="results-grid">
              <div className="result-card">
                <h3>Montant du Sinistre</h3>
                <p className="amount">{result.estimatedAmount.toFixed(2)} DT</p>
              </div>

              <div className="result-card">
                <h3>Couverture Actuelle</h3>
                <p className="percentage">{result.coveragePercentage}%</p>
              </div>

              <div className="result-card highlight">
                <h3>Montant Remboursé</h3>
                <p className="reimbursed">{result.reimbursedAmount} DT</p>
              </div>

              <div className="result-card warning">
                <h3>Montant Non Couvert</h3>
                <p className="uncovered">{result.uncoveredAmount} DT</p>
              </div>
            </div>

            <div className="recommendation-box">
              <h3>💡 Notre Conseil</h3>
              <p>{result.recommendation}</p>
            </div>

            <div className="comparison-chart">
              <h3>Comparaison de Couverture</h3>
              <div className="bars">
                <div className="bar-item">
                  <div className="bar-label">Couverture Actuelle</div>
                  <div className="bar-container">
                    <div
                      className="bar current"
                      style={{ width: `${formData.currentCoverage}%` }}
                    >
                      {formData.currentCoverage}%
                    </div>
                  </div>
                </div>

                <div className="bar-item">
                  <div className="bar-label">Couverture Proposée</div>
                  <div className="bar-container">
                    <div
                      className="bar proposed"
                      style={{
                        width: `${Math.min(formData.currentCoverage + 20, 100)}%`
                      }}
                    >
                      {Math.min(formData.currentCoverage + 20, 100)}%
                    </div>
                  </div>
                </div>
              </div>
              <p className="improvement">
                Amélioration possible: <strong>+{improvementPercentage()}%</strong>
              </p>
            </div>

            <button className="subscribe-btn">
              ✅ Souscrire à cette Extension
            </button>
          </div>
        )}
      </div>

      <div className="tips-section">
        <h2>💡 Conseils pour Optimiser votre Couverture</h2>
        <div className="tips-grid">
          <div className="tip">
            <span className="tip-icon">🎯</span>
            <h4>Évaluez vos Besoins</h4>
            <p>Considérez votre situation de vie et vos risques potentiels.</p>
          </div>
          <div className="tip">
            <span className="tip-icon">📊</span>
            <h4>Analysez les Sinistres</h4>
            <p>Examinez les types de sinistres les plus courants dans votre région.</p>
          </div>
          <div className="tip">
            <span className="tip-icon">💰</span>
            <h4>Comparez les Primes</h4>
            <p>Trouvez le meilleur équilibre entre couverture et prix.</p>
          </div>
          <div className="tip">
            <span className="tip-icon">🔄</span>
            <h4>Révisez Régulièrement</h4>
            <p>Mettez à jour votre couverture quand votre situation change.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
