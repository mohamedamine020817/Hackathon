#!/bin/bash

# InsurSmart - Setup et Démarrage Script
# Hackathon MutualHack 3.0

echo "🚀 InsurSmart - Installation & Démarrage"
echo "=========================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js non installé. Veuillez installer Node.js 16+ d'abord."
    exit 1
fi

echo "✅ Node.js installé: $(node --version)"
echo ""

# Install Backend
echo "📦 Installation du Backend..."
cd backend
npm install > /dev/null 2>&1
echo "✅ Backend installé"
cd ..

# Install Web
echo "📦 Installation de l'App Web..."
cd web
npm install > /dev/null 2>&1
echo "✅ Web app installée"
cd ..

# Install Mobile
echo "📦 Installation de l'App Mobile..."
cd mobile
npm install > /dev/null 2>&1
echo "✅ Mobile app installée"
cd ..

echo ""
echo "✨ Installation Terminée!"
echo ""
echo "🎯 Pour lancer l'application:"
echo ""
echo "Terminal 1 - Backend (Port 5000):"
echo "  cd backend && npm start"
echo ""
echo "Terminal 2 - Web App (Port 3000):"
echo "  cd web && npm start"
echo ""
echo "Terminal 3 - Mobile App (Port 3001):"
echo "  cd mobile && npm start"
echo ""
echo "✅ Accès aux apps:"
echo "  Web: http://localhost:3000"
echo "  Mobile: http://localhost:3001"
echo "  API: http://localhost:5000/api/health"
echo ""
