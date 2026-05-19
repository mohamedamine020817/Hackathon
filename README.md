# InsurSmart 🚀

**La plateforme intelligente de l'adhérent** - Solution digitale complète pour MAE Assurances

![Version](https://img.shields.io/badge/version-1.0.0-green)
![Status](https://img.shields.io/badge/status-MVP-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 📱 Vue d'ensemble

InsurSmart est une plateforme d'assurance intelligente et humaine qui transforme l'expérience assurantielle en mettant l'adhérent au centre. La solution combine analyse comportementale, scoring de risque, recommandations intelligentes et gamification pour créer une expérience fluide et engageante.

### 🎯 Fonctionnalités Principales

✅ **Dashboard Personnalisé (360°)** - Vue synthétique de tous les contrats et garanties
✅ **Score de Prévention** - Indicateur dynamique du niveau de risque
✅ **Alertes Proactives** - Notifications intelligentes basées sur contexte (météo, saisonnalité)
✅ **Assistance Urgence (SOS)** - Accès immédiat aux services d'urgence avec géolocalisation
✅ **Gamification** - Système XP, badges et niveaux de statut
✅ **Simulateur de Couverture** - Évaluation et optimisation des garanties
✅ **Déclaration de Sinistre Digitalisée** - Processus rapide et simple
✅ **Assistant IA Maya** - Conseiller conversationnel 24h/24

## 🏗️ Architecture

```
Hackathon/
├── backend/                 # API REST Node.js/Express
│   ├── server.js           # Serveur principal
│   └── package.json        # Dépendances backend
│
├── web/                     # Application Web React
│   ├── src/
│   │   ├── components/      # Composants React
│   │   ├── App.js          # Composant principal
│   │   └── App.css         # Styles globaux
│   └── package.json        # Dépendances web
│
├── mobile/                  # Application Mobile React
│   ├── src/
│   │   ├── components/      # Composants mobiles
│   │   ├── AppMobile.js    # App mobile
│   │   └── AppMobile.css   # Styles mobiles
│   └── package.json        # Dépendances mobile
│
├── INSTALLATION.md          # Guide d'installation
├── ARCHITECTURE.md          # Architecture technique
└── README.md               # Ce fichier
```

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 16+ 
- npm ou yarn
- Navigateur moderne (Chrome, Firefox, Safari)

### Installation et Lancement

#### 1. Backend API

```bash
cd backend
npm install
npm start
```

Le serveur démarre sur `http://localhost:5000`

#### 2. Application Web

```bash
cd web
npm install
npm start
```

L'app web démarre sur `http://localhost:3000`

#### 3. Application Mobile

```bash
cd mobile
npm install
npm start
```

L'app mobile démarre sur `http://localhost:3001`

## 🎨 Design System

### Couleurs

- **Vert Primaire:** `#2d8659` - Couleur principale, confiance
- **Vert Clair:** `#4a9f6f` - Accents, surbrillance
- **Blanc:** `#ffffff` - Fond, texte positif
- **Gris Clair:** `#f5f5f5` - Backgrounds secondaires

## 📊 Données de Démonstration

Le backend fournit des données simulées pour la démonstration :

**Utilisateurs:**
- ID 1: Sarah Belhadj (22 ans, Tunis) - Score: 72
- ID 2: Karim Bouali (41 ans, Sfax) - Score: 85

**Contrats:** 4 contrats actifs
**Alertes:** Notifications intelligentes
**Badges:** Système de récompense

## 🎮 Système de Gamification

| Niveau | Points XP | Récompenses |
|--------|-----------|------------|
| Bronze | 0-499 | Accès basique |
| Argent | 500-799 | -5% prime |
| Or | 800-999 | -10% prime + support prioritaire |
| Platine | 1000+ | -15% prime + services VIP |

## 📱 Réactivité

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

## 🔐 Sécurité & Données

⚠️ **IMPORTANT** - Version HACKATHON avec données simulées
- Aucune donnée réelle
- Les données sont régénérées à chaque redémarrage
- Pas d'authentification en 48h

## 📈 Feuille de Route

### Phase 0 - Hackathon (Fait ✅)
- MVP avec 5+ fonctionnalités clés
- Dashboard complet
- Assistant Maya simplifié
- Système XP de base

### Phase 1 - Post-Hackathon (M+1 à M+3)
- Intégration réelle avec systèmes MAE
- Score de prévention calculé en temps réel
- Moteur de recommandation v1

### Phase 2 - Lancement (M+4 à M+8)
- Ouverture à tous les adhérents
- Prédiction de sinistres (ML)

### Phase 3 - Expansion (M+9 à M+18)
- APIs partenaires
- Usage-based insurance

## 📞 Ressources

- [Installation Complète](./INSTALLATION.md)
- [Architecture Technique](./ARCHITECTURE.md)

## 📄 Licence

MIT License

---

**InsurSmart** - L'Assurance de Demain, Aujourd'hui 🌟

💚 Fait avec passion pour MAE Assurances - MutualHack 3.0