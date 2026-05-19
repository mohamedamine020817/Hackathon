import React from 'react';
import { FaHome, FaBell, FaTrophy } from 'react-icons/fa';
import './MobileNavigation.css';

export default function MobileNavigation({ currentPage, setCurrentPage }) {
  const navItems = [
    { id: 'dashboard', label: 'Accueil', icon: FaHome },
    { id: 'alerts', label: 'Alertes', icon: FaBell },
    { id: 'badges', label: 'Badges', icon: FaTrophy }
  ];

  return (
    <nav className="mobile-nav">
      {navItems.map(item => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            className={`mobile-nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => setCurrentPage(item.id)}
          >
            <Icon size={24} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
