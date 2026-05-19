# Architecture Technique - InsurSmart

## 🏗️ Aperçu Global

```
┌─────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                            │
├───────────────────────────┬─────────────────────────────────────┤
│  Web App (React)          │  Mobile App (React Native Web)     │
│  - Dashboard              │  - Dashboard Mobile                 │
│  - SOS                    │  - Alerts                           │
│  - Sinistre              │  - Gamification                     │
│  - Coverage Sim           │  - Responsive Design               │
│  - Maya Chat              │  - Bottom Navigation               │
│  - Desktop Optimized      │  - Touch Optimized                │
└───────────────────────────┴─────────────────────────────────────┘
         │                              │
         └──────────────┬───────────────┘
                        │ HTTP/REST
         ┌──────────────┴───────────────┐
         │                              │
         ▼                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                      API LAYER (Backend)                         │
│                    Node.js + Express                             │
├──────────────────────────────────────────────────────────────────┤
│  ✅ 12 Endpoints REST                                            │
│  ✅ CORS Enabled                                                 │
│  ✅ Mock Database (In-Memory)                                    │
│  ✅ Real-time Scoring                                            │
│  ✅ AI Chat Integration                                          │
└──────────────────────────────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────────────────────────┐
│                     DATA LAYER                                   │
│                  Mock Persistence                                │
├──────────────────────────────────────────────────────────────────┤
│  📊 Users (2 fixtures)                                           │
│  📋 Contracts (4)                                                │
│  ⚠️ Alerts (2+)                                                  │
│  🏆 Badges (3)                                                   │
│  💡 Recommendations (2)                                          │
└──────────────────────────────────────────────────────────────────┘
```

## 📱 Stack Technologique

### Frontend

| Couche | Technologie | Version | Notes |
|--------|-------------|---------|-------|
| Web Framework | React | 18.2.0 | SPA moderne |
| Mobile | React (web version) | 18.2.0 | Responsive |
| HTTP Client | Axios | 1.4.0 | API calls |
| Icons | react-icons | 4.11.0 | SVG icons |
| Styling | CSS3 | - | Custom design |
| Build Tool | Create React App | 5.0.1 | Zero config |

### Backend

| Couche | Technologie | Version | Notes |
|--------|-------------|---------|-------|
| Runtime | Node.js | 16+ | Execution |
| Framework | Express | 4.18.2 | Web server |
| CORS | cors | 2.8.5 | Cross-origin |
| Utilities | uuid | 9.0.0 | ID generation |
| HTTP | axios | 1.4.0 | External calls |
| Env | dotenv | 16.0.3 | Configuration |

## 🔄 Flux de Données

### Exemple: Récupérer le Dashboard

```
1. Client (Web/Mobile)
   │
   ├─ GET /api/user/1
   │
2. Backend Express Server
   │
   ├─ Chercher user[1]
   ├─ Chercher contracts
   ├─ Chercher alerts
   ├─ Chercher recommendations
   │
3. Return JSON
   │
   └─ Client reçoit et affiche
```

### Exemple: Déclarer un Sinistre

```
1. Client FormForm
   │
   ├─ POST /api/claim/declare
   ├─ { userId, type, description, photos }
   │
2. Backend
   │
   ├─ Valider les données
   ├─ Générer claim ID
   ├─ Créer objet claim
   ├─ POST /api/xp/add (award 50 XP)
   │
3. Response
   │
   ├─ { success: true, claim: {...} }
   │
   └─ Client affiche success + suivi
```

## 🔐 Architecture de Sécurité (MVP)

### Phase Hackathon (ACTUELLEMENT)

⚠️ **NON-SÉCURISÉ À USAGE DÉMO UNIQUEMENT**

- ❌ Pas d'authentification
- ❌ Pas de chiffrement
- ❌ Pas de validation d'autorisation
- ❌ Données en mémoire (perdues)
- ✅ CORS pour éviter les erreurs

### Production (À Implémenter)

```
┌─ Client Auth
│   ├─ 2FA (SMS/Email)
│   ├─ JWT Tokens
│   └─ Session Management
│
├─ Data Layer
│   ├─ AES-256 Encryption
│   ├─ PostgreSQL + Redis
│   └─ Backup automatique
│
├─ API Security
│   ├─ Rate Limiting
│   ├─ Input Validation
│   ├─ OWASP Headers
│   └─ SQL Injection Prevention
│
└─ Infrastructure
    ├─ HTTPS/TLS
    ├─ WAF (Web Application Firewall)
    ├─ DDoS Protection
    └─ Monitoring/Logging
```

## 📊 Données et Modèles

### User Model

```javascript
{
  id: String,           // UUID unique
  name: String,         // Nom complet
  email: String,        // Email unique
  phone: String,        // Téléphone
  age: Number,          // Âge (18-99)
  location: String,     // Ville
  contracts: [String],  // IDs de contrats
  xp: Number,           // Points XP (0+)
  level: String,        // Bronze/Argent/Or/Platine
  preventionScore: Number,  // 0-100
  lastUpdate: ISO8601   // Date mise à jour
}
```

### Contract Model

```javascript
{
  id: String,           // Unique ID
  userId: String,       // Owner reference
  type: String,         // Auto/Home/Health/Travel
  premium: Number,      // Monthly price (DT)
  status: String,       // active/inactive
  coverage: Number,     // Percentage (0-100)
  startDate: Date,      // Contract start
  endDate: Date,        // Contract end
  guarantees: [String]  // Coverage types
}
```

### Alert Model

```javascript
{
  id: String,           // UUID
  userId: String,       // Target user
  type: String,         // weather/reminder/risk
  title: String,        // Alert title
  message: String,      // Alert message
  severity: String,     // high/medium/low
  read: Boolean,        // Read status
  createdAt: ISO8601    // Creation time
}
```

## 🎯 Algorithmes Implémentés

### Score de Prévention

**Formule:**
```
Score = (35% × claimsHistory) + 
        (25% × profileBehavior) +
        (20% × coverageLevel) +
        (10% × externalContext) +
        (10% × appEngagement)
```

**Interprétation:**
- 0-60:    🔴 Risque élevé
- 60-80:   🟡 Risque moyen
- 80-100:  🟢 Risque faible

### Niveau XP

```javascript
if (xp >= 1000) level = 'Platine';    // -15% prime
else if (xp >= 800) level = 'Or';     // -10% prime
else if (xp >= 500) level = 'Argent'; // -5% prime
else level = 'Bronze';                 // No reduction
```

### Moteur de Recommandation (Base)

```javascript
// Filtrage basé sur le contenu
if (profile.age < 30 && !contracts.travel) {
  recommend("Travel Insurance");
}

// Détection sous-couverture
if (coverage < 70 && riskScore > 75) {
  recommend("Increase Coverage");
}

// Logique métier
if (location == "coastal" && !contracts.flood) {
  recommend("Flood Coverage");
}
```

## 🚀 Performance

### Temps de Réponse Cibles

| Endpoint | Cible | Actuel |
|----------|-------|--------|
| GET /user/:id | <200ms | ~50ms ✅ |
| GET /prevention-score | <100ms | ~20ms ✅ |
| POST /coverage-simulation | <300ms | ~30ms ✅ |
| POST /claim/declare | <500ms | ~40ms ✅ |

### Optimisations

- ✅ In-memory database (pas de DB)
- ✅ Pas d'I/O asynchrone lourd
- ✅ Caching côté client
- ✅ Compression CSS (minification)
- ✅ Lazy loading d'images
- ✅ Code splitting React

## 📈 Scalabilité

### Architecture Scalable (Production)

```
┌─────────────────────────────────────────┐
│       Load Balancer (Nginx)             │
├──────────┬──────────┬──────────┬────────┤
│ Instance │ Instance │ Instance │Instance│
│   Pod 1  │  Pod 2   │  Pod 3   │ Pod N  │
│ (Docker) │ (Docker) │ (Docker) │(Docker)│
└──────────┴──────────┴──────────┴────────┘
         │
┌────────┴────────────┐
│  Service Discovery  │
│  (Kubernetes/mesh)  │
└────────┬────────────┘
         │
┌────────┴────────────────────┐
│    Database Layer           │
├──────────────┬──────────────┤
│  PostgreSQL  │    Redis     │
│  (Relational)│  (Cache)     │
└──────────────┴──────────────┘
```

## 🔌 Intégrations Externes (Futures)

```javascript
// API Météo
const weather = axios.get('openweathermap.org/api');

// Géolocalisation
const location = google.maps.api.geocode();

// Paiement
const payment = stripe.charges.create();

// Notifications
const notification = firebase.messaging.send();

// LLM (IA)
const aiResponse = openai.createChatCompletion();

// CRM MAE (Interne)
const customer = mae_crm.getCustomer();
```

## 🧪 Architecture de Test

### Unit Tests (À venir)

```
└─ __tests__
   ├─ api
   │  └─ user.test.js
   ├─ components
   │  └─ Dashboard.test.js
   └─ utils
      └─ scoring.test.js
```

### Integration Tests

```
└─ tests
   ├─ e2e
   │  └─ claim-flow.test.js
   └─ api
      └─ endpoints.test.js
```

### Performance Tests

```
- Load testing (k6)
- Lighthouse audit
- Bundle analysis
```

## 📚 Documentation Code

### Commentaires Importants

```javascript
// ✅ Sections clés

// src/components/Dashboard.js
// - Prevention score calculation
// - Alert filtering
// - Contract aggregation

// backend/server.js
// - API routing
// - Data validation
// - Error handling

// AppMobile.css
// - Responsive breakpoints
// - Mobile-first approach
// - Touch-friendly interactions
```

---

**Architecture maintenue pour scalabilité et maintenabilité future**
