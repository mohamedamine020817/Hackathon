# Installation & Documentation

## 📋 Prérequis Système

- Node.js 16.x ou supérieur
- npm 8.x ou supérieur (ou yarn)
- Terminal/Console
- Connexion internet (pour télécharger les dépendances)

## 🛠️ Installation Complète

### Étape 1: Préparer le Backend

```bash
cd 
npm install
```

Fichiers créés automatiquement:
- `node_modules/` - Dépendances
- `package-lock.json` - Lock file

### Étape 2: Préparer l'Application Web

```bash
cd ../web
npm install
```

### Étape 3: Préparer l'Application Mobile

```bash
cd ../mobile
npm install
```

## 🚀 Lancement en 3 Terminals

### Terminal 1 - Backend (http://localhost:5000)

```bash
cd backend
npm start
```

✅ Quand vous voyez: `🚀 InsurSmart Backend running on port 5000`

### Terminal 2 - Web App (http://localhost:3000)

```bash
cd web
npm start
```

✅ Le navigateur s'ouvre automatiquement sur http://localhost:3000

### Terminal 3 - Mobile App (http://localhost:3001)

```bash
cd mobile
npm start
```

✅ Redirection vers http://localhost:3001

## 🎯 Accès aux Applications

| Plateforme | URL | Utilisateur | Résolution |
|-----------|-----|-------------|-----------|
| **Web** | http://localhost:3000 | Sarah (ID:1) | 1920x1080+ |
| **Mobile** | http://localhost:3001 | Karim (ID:2) | 375x812 |
| **API** | http://localhost:5000 | - | - |

## 🧪 Vérification de l'Installation

### 1. Vérifier le Backend

```bash
curl http://localhost:5000/api/health
```

Réponse attendue:
```json
{
  "status": "OK",
  "timestamp": "2026-05-19T..."
}
```

### 2. Vérifier l'Utilisateur 1

```bash
curl http://localhost:5000/api/user/1
```

Réponse: Données complètes de Sarah Belhadj

### 3. Vérifier l'Utilisateur 2

```bash
curl http://localhost:5000/api/user/2
```

Réponse: Données complètes de Karim Bouali

## 🎮 Fonctionnalités Testables

### Sur l'Application Web (ID:1 - Sarah)

- ✅ Dashboard avec score de prévention
- ✅ Consulter les contrats
- ✅ Voir les alertes
- ✅ Simulator de couverture
- ✅ Déclarer un sinistre
- ✅ Chat avec Maya IA
- ✅ Bouton SOS avec géolocalisation
- ✅ Système de badges

### Sur l'Application Mobile (ID:2 - Karim)

- ✅ Dashboard mobile optimisé
- ✅ Vue alertes et notifications
- ✅ Système de gamification
- ✅ Vue des badges
- ✅ Classement (leaderboard)
- ✅ Actions rapides XP
- ✅ Navigation en bas de l'écran

## 🐛 Troubleshooting

### Port déjà utilisé

```bash
# Si le port 3000/5000 est occupé
# Sur Mac/Linux:
lsof -i :3000
kill -9 <PID>

# Sur Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Modules introuvables

```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

### Problèmes CORS

Les CORS sont configurés dans `backend/server.js` pour accepter `http://localhost:*`

### Erreur "React not found"

```bash
cd web
npm install react react-dom
npm start
```

## 📊 Structure des Données

### Utilisateur (User)

```javascript
{
  id: "1",
  name: "Sarah Belhadj",
  email: "sarah@example.com",
  phone: "+216 98 123 456",
  age: 22,
  location: "Tunis",
  contracts: ["CONT-001", "CONT-002"],
  xp: 450,
  level: "Argent",
  preventionScore: 72
}
```

### Contrat (Contract)

```javascript
{
  id: "CONT-001",
  userId: "1",
  type: "Travel Insurance",
  premium: 45.50,
  status: "active",
  coverage: 85,
  startDate: "2024-01-15",
  endDate: "2025-01-15",
  guarantees: ["Accident", "Medical", "Luggage"]
}
```

### Score de Prévention (Score)

```javascript
{
  score: 72,
  level: "Argent",
  xp: 450,
  breakdown: {
    claimsHistory: 35,        // Historique sinistres: 35%
    profileBehavior: 25,      // Comportement déclaré: 25%
    coverageLevel: 20,        // Niveau couverture: 20%
    externalContext: 10,      // Contexte externe: 10%
    appEngagement: 10         // Engagement app: 10%
  },
  trend: "up"
}
```

## 🎨 Personnalisation

### Changer les couleurs

Éditez `:root` dans les fichiers CSS:
- `web/src/App.css`
- `mobile/src/AppMobile.css`

```css
:root {
  --primary-green: #2d8659;  /* Changer ici */
  --light-green: #4a9f6f;
  --white: #ffffff;
  /* ... */
}
```

### Ajouter un nouvel endpoint

Éditez `backend/server.js`:

```javascript
app.get('/api/mon-endpoint', (req, res) => {
  res.json({ message: 'Mon nouvel endpoint' });
});
```

## 📱 Responsive Testing

### Chrome DevTools

1. F12 pour ouvrir DevTools
2. Ctrl+Shift+M (Cmd+Shift+M sur Mac)
3. Sélectionner "iPhone 12 Pro" ou "iPad Pro"

### Tester le Mobile

```bash
# URL réseau locale (si sur le même réseau)
http://<YOUR_IP>:3001
```

## 📝 Notes Importantes

### Données

- ✅ Toutes les données sont simulées
- ✅ Aucune persistance (données resent au redémarrage)
- ✅ 2 utilisateurs de démonstration
- ✅ Données générées aléatoirement pour le réalisme

### Mode Production

Pour transformer en production:

1. **Backend:** Ajouter authentification, base de données réelle
2. **Web/Mobile:** Build statique avec `npm run build`
3. **Déploiement:** Docker, Kubernetes, ou service cloud

## 🎓 Ressources Additionnelles

### Documentation des Composants

- [Navigation](./web/src/components/Navigation.js) - Barre de navigation
- [Dashboard](./web/src/components/Dashboard.js) - Page d'accueil
- [SOS](./web/src/components/SOS.js) - Assistance urgence
- [CoverageSimulator](./web/src/components/CoverageSimulator.js) - Simulation
- [ClaimForm](./web/src/components/ClaimForm.js) - Sinistre
- [MayaAssistant](./web/src/components/MayaAssistant.js) - Chat IA

### Endpoints API Complets

Voir `backend/server.js` pour la liste complète avec descriptions

## ✅ Checklist de Lancement

- [ ] Node.js installé (`node --version`)
- [ ] npm installé (`npm --version`)
- [ ] 3 terminaux ouverts
- [ ] Backend en cours d'exécution
- [ ] Web app en cours d'exécution
- [ ] Mobile app en cours d'exécution
- [ ] Vérification http://localhost:5000/api/health
- [ ] Web app charge sur http://localhost:3000
- [ ] Mobile app charge sur http://localhost:3001

## 🎉 C'est Prêt!

Vous avez maintenant une plateforme InsurSmart complètement fonctionnelle! 

Explorez les différentes fonctionnalités et testez l'expérience utilisateur.

Pour des questions ou problèmes, consultez les fichiers sources ou les commentaires de code.

**Bon hackathon!** 🚀
