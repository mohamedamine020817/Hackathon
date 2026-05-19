import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './MayaAssistant.css';

const API_URL = 'http://localhost:5000/api';

export default function MayaAssistant({ userId }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'maya',
      text: 'Bonjour! 👋 Je suis Maya, votre assistant d\'assurance intelligent. Comment puis-je vous aider?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestions = [
    'Quelle est ma couverture?',
    'Comment déclarer un sinistre?',
    'Comment améliorer mon score de prévention?',
    'Que sont les points XP?',
    'Comment marche le système de badges?'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text = input) => {
    if (!text.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/maya/chat`, {
        message: text,
        userId
      });

      const mayaMessage = {
        id: messages.length + 2,
        sender: 'maya',
        text: response.data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, mayaMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: messages.length + 2,
        sender: 'maya',
        text: 'Désolée, je n\'ai pas bien compris. Pouvez-vous reformuler votre question?',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="maya-assistant">
      <div className="maya-header">
        <div className="maya-title">
          <h1>🤖 Maya - Assistant Intelligent</h1>
          <p>Votre conseiller d'assurance disponible 24h/24</p>
        </div>
        <div className="maya-status">
          <span className="status-dot online"></span>
          <span>En ligne</span>
        </div>
      </div>

      <div className="chat-container">
        <div className="messages-area">
          {messages.map(message => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-avatar">
                {message.sender === 'maya' ? '🤖' : '👤'}
              </div>
              <div className="message-content">
                <div className="message-bubble">{message.text}</div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="message maya">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="message-bubble">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="suggestions">
            <p>Suggestions:</p>
            <div className="suggestions-grid">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="suggestion-btn"
                  onClick={() => handleSendMessage(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="input-area">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Posez votre question..."
            rows="2"
          />
          <button
            className="send-btn"
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || loading}
          >
            ➤ Envoyer
          </button>
        </div>
      </div>

      <div className="maya-features">
        <h2>✨ Fonctionnalités de Maya</h2>
        <div className="features-grid">
          <div className="feature">
            <span className="icon">💬</span>
            <h3>Questions Générales</h3>
            <p>Posez vos questions sur vos contrats et garanties</p>
          </div>
          <div className="feature">
            <span className="icon">📋</span>
            <h3>Aide à la Déclaration</h3>
            <p>Assistance étape par étape pour vos sinistres</p>
          </div>
          <div className="feature">
            <span className="icon">💡</span>
            <h3>Conseils Personnalisés</h3>
            <p>Recommandations adaptées à votre profil</p>
          </div>
          <div className="feature">
            <span className="icon">🚀</span>
            <h3>Escalade Intelligente</h3>
            <p>Transfert à un conseiller humain si nécessaire</p>
          </div>
        </div>
      </div>
    </div>
  );
}
