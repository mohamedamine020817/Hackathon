import React from 'react';
import { FaHome, FaExclamationCircle, FaHeartbeat, FaGamepad, FaComments } from 'react-icons/fa';
import './Navigation.css';

export default function Navigation({ currentPage, setCurrentPage }) {
  const navItems = [
    { id: 'dashboard', label: 'Accueil', icon: FaHome },
    { id: 'sos', label: 'SOS', icon: FaExclamationCircle },
    { id: 'coverage', label: 'Simulateur', icon: FaHeartbeat },
    { id: 'claim', label: 'Sinistre', icon: FaGamepad },
    { id: 'maya', label: 'Maya IA', icon: FaComments }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <h1>💚 InsurSmart</h1>
        </div>
        <div className="nav-items">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => setCurrentPage(item.id)}
              >
                <Icon />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
