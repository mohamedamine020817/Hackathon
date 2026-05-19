# Quick Reference - InsurSmart API

## 🚀 API Endpoints

### User Management
```
GET /api/user/:id
  → Retourne les données complètes de l'utilisateur
  
GET /api/contracts/:userId
  → Liste des contrats de l'utilisateur
  
GET /api/alerts/:userId
  → Alertes et notifications
  
POST /api/alerts/mark-read
  → Marquer une alerte comme lue
```

### Prevention & Scoring
```
GET /api/prevention-score/:userId
  → Score de prévention avec décomposition
  
GET /api/badges
  → Liste de tous les badges disponibles
```

### Coverage & Claims
```
POST /api/coverage-simulation
  → Simulation de couverture
  
POST /api/claim/declare
  → Déclarer un sinistre
```

### Gamification
```
POST /api/xp/add
  → Ajouter des points XP à un utilisateur
```

### Emergency
```
GET /api/sos-emergency/:userId
  → Informations d'urgence et d'assistance
```

### AI Assistant
```
POST /api/maya/chat
  → Chat avec assistant IA
```

### System
```
GET /api/health
  → Vérifier l'état du serveur
```

---

## 📊 Exemples d'Appels API

### 1. Récupérer les données d'un utilisateur
```bash
curl http://localhost:5000/api/user/1
```

### 2. Obtenir le score de prévention
```bash
curl http://localhost:5000/api/prevention-score/1
```

### 3. Simuler une couverture
```bash
curl -X POST http://localhost:5000/api/coverage-simulation \
  -H "Content-Type: application/json" \
  -d '{
    "contractType": "auto",
    "estimatedAmount": 5000,
    "currentCoverage": 70
  }'
```

### 4. Déclarer un sinistre
```bash
curl -X POST http://localhost:5000/api/claim/declare \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "1",
    "claimType": "accident",
    "description": "Accident automobile route 1 Tunis"
  }'
```

### 5. Ajouter des points XP
```bash
curl -X POST http://localhost:5000/api/xp/add \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "1",
    "points": 50,
    "action": "Déclaration rapide"
  }'
```

### 6. Chat avec Maya
```bash
curl -X POST http://localhost:5000/api/maya/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Comment déclarer un sinistre?",
    "userId": "1"
  }'
```

### 7. Marquer une alerte comme lue
```bash
curl -X POST http://localhost:5000/api/alerts/mark-read \
  -H "Content-Type: application/json" \
  -d '{"alertId": "alert-id-here"}'
```

---

## 🔄 Flux Principaux

### Dashboard Flow
```
1. GET /user/1                    (Get user data)
2. GET /prevention-score/1        (Get score)
3. GET /alerts/1                  (Get alerts)
4. GET /badges                    (Get badges)
```

### Claim Declaration Flow
```
1. GET /user/1                    (Confirm user)
2. POST /claim/declare            (Submit claim)
3. POST /xp/add                   (Award XP)
4. POST /alerts/mark-read         (Mark alerts)
```

### Coverage Simulation Flow
```
1. POST /coverage-simulation      (Calculate)
2. Display results                (No DB update)
```

---

## 📱 Frontend Integration

### React Web App
```javascript
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Example: Fetch user data
const fetchUser = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};
```

### React Mobile App
```javascript
// Same API configuration
// Just different UI components
// Same endpoints
```

---

## 🎯 Key Data Models

### User
- id, name, email, phone, age, location
- contracts: [], xp, level, preventionScore

### Contract
- id, userId, type, premium, status, coverage
- startDate, endDate, guarantees

### Alert
- id, userId, type, title, message, severity, read

### Score
- score (0-100), level, xp, breakdown, trend

---

## ✅ Testing Checklist

- [ ] Backend starts: http://localhost:5000/api/health
- [ ] Web loads: http://localhost:3000
- [ ] Mobile loads: http://localhost:3001
- [ ] User 1 data loads: http://localhost:5000/api/user/1
- [ ] User 2 data loads: http://localhost:5000/api/user/2
- [ ] Prevention score works
- [ ] Coverage simulator works
- [ ] Claim declaration works
- [ ] XP adds successfully
- [ ] Maya chat responds

---

## 🚀 Production Deployment

### Docker (Future)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY backend .
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
```

### Kubernetes (Future)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: insursmart-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: insursmart
  template:
    metadata:
      labels:
        app: insursmart
    spec:
      containers:
      - name: api
        image: insursmart-backend:latest
        ports:
        - containerPort: 5000
```

---

**API Reference - InsurSmart Backend**
