const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Mock Database
const users = [
  {
    id: '1',
    name: 'Sarah Belhadj',
    email: 'sarah@example.com',
    phone: '+216 98 123 456',
    age: 22,
    location: 'Tunis',
    contracts: ['CONT-001', 'CONT-002'],
    xp: 450,
    level: 'Argent',
    preventionScore: 72,
    lastUpdate: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Karim Bouali',
    email: 'karim@example.com',
    phone: '+216 98 234 567',
    age: 41,
    location: 'Sfax',
    contracts: ['CONT-003', 'CONT-004'],
    xp: 820,
    level: 'Or',
    preventionScore: 85,
    lastUpdate: new Date().toISOString()
  }
];

const contracts = [
  {
    id: 'CONT-001',
    userId: '1',
    type: 'Travel Insurance',
    premium: 45.50,
    status: 'active',
    coverage: 85,
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    guarantees: ['Accident', 'Medical', 'Luggage']
  },
  {
    id: 'CONT-002',
    userId: '1',
    type: 'Home Insurance',
    premium: 120.00,
    status: 'active',
    coverage: 70,
    startDate: '2024-03-01',
    endDate: '2025-03-01',
    guarantees: ['Fire', 'Flood', 'Theft']
  },
  {
    id: 'CONT-003',
    userId: '2',
    type: 'Auto Insurance',
    premium: 180.50,
    status: 'active',
    coverage: 95,
    startDate: '2024-02-10',
    endDate: '2025-02-10',
    guarantees: ['Collision', 'Liability', 'Assistance']
  },
  {
    id: 'CONT-004',
    userId: '2',
    type: 'Health Insurance',
    premium: 65.00,
    status: 'active',
    coverage: 80,
    startDate: '2024-01-01',
    endDate: '2025-01-01',
    guarantees: ['Doctor', 'Hospital', 'Emergency']
  }
];

const alerts = [
  {
    id: uuidv4(),
    userId: '1',
    type: 'weather',
    title: 'Risque de tempête ce soir',
    message: 'Risque de tempête dans votre région demain. Pensez à protéger votre domicile.',
    severity: 'high',
    read: false,
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    userId: '2',
    type: 'reminder',
    title: 'Contrôle technique à prévoir',
    message: 'Votre contrôle technique arrive à expiration le 15/06/2026',
    severity: 'medium',
    read: false,
    createdAt: new Date().toISOString()
  }
];

const badges = [
  { id: 1, name: 'Conducteur Prudent', icon: '🚗', description: 'Aucun sinistre pendant 12 mois' },
  { id: 2, name: 'Famille Protégée', icon: '👨‍👩‍👧‍👦', description: 'Couverture complète de tous les membres' },
  { id: 3, name: 'Adhérent Proactif', icon: '⭐', description: 'Plus de 500 points XP' }
];

const recommendations = [
  {
    id: 1,
    userId: '1',
    type: 'coverage',
    title: 'Extension voyage recommandée',
    description: 'Vous partez en stage en France. Pensez à étendre votre couverture voyage.',
    action: 'Simuler'
  },
  {
    id: 2,
    userId: '2',
    type: 'update',
    title: 'Mettez à jour votre profil',
    description: 'Votre situation a changé? Informez-nous pour une couverture optimale.',
    action: 'Mettre à jour'
  }
];

// Routes

// 1. GET /api/user/:id - Get user dashboard
app.get('/api/user/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const userContracts = contracts.filter(c => c.userId === req.params.id);
  const userAlerts = alerts.filter(a => a.userId === req.params.id);
  const userRecommendations = recommendations.filter(r => r.userId === req.params.id);

  res.json({
    user: {
      ...user,
      contracts: userContracts,
      alerts: userAlerts,
      recommendations: userRecommendations
    }
  });
});

// 2. GET /api/contracts/:userId - Get user contracts
app.get('/api/contracts/:userId', (req, res) => {
  const userContracts = contracts.filter(c => c.userId === req.params.userId);
  res.json({ contracts: userContracts });
});

// 3. GET /api/alerts/:userId - Get user alerts
app.get('/api/alerts/:userId', (req, res) => {
  const userAlerts = alerts.filter(a => a.userId === req.params.userId);
  res.json({ alerts: userAlerts });
});

// 4. POST /api/alerts/mark-read - Mark alert as read
app.post('/api/alerts/mark-read', (req, res) => {
  const { alertId } = req.body;
  const alert = alerts.find(a => a.id === alertId);
  if (alert) {
    alert.read = true;
  }
  res.json({ success: true });
});

// 5. GET /api/badges - Get all available badges
app.get('/api/badges', (req, res) => {
  res.json({ badges });
});

// 6. GET /api/prevention-score/:userId - Get prevention score
app.get('/api/prevention-score/:userId', (req, res) => {
  const user = users.find(u => u.id === req.params.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json({
    score: user.preventionScore,
    level: user.level,
    xp: user.xp,
    breakdown: {
      claimsHistory: 35,
      profileBehavior: 25,
      coverageLevel: 20,
      externalContext: 10,
      appEngagement: 10
    },
    trend: 'up'
  });
});

// 7. POST /api/coverage-simulation - Simulate coverage
app.post('/api/coverage-simulation', (req, res) => {
  const { contractType, estimatedAmount, currentCoverage } = req.body;
  
  // Simulation logic
  const claimResult = (estimatedAmount * currentCoverage) / 100;
  const gapAmount = estimatedAmount - claimResult;
  
  res.json({
    simulation: {
      claimType: contractType,
      estimatedAmount: estimatedAmount,
      coveragePercentage: currentCoverage,
      reimbursedAmount: claimResult.toFixed(2),
      uncoveredAmount: gapAmount.toFixed(2),
      recommendation: gapAmount > 0 ? `Vous pourriez améliorer votre couverture de ${(gapAmount * 1.1).toFixed(2)} DT` : 'Couverture suffisante'
    }
  });
});

// 8. POST /api/xp/add - Add XP points
app.post('/api/xp/add', (req, res) => {
  const { userId, points, action } = req.body;
  const user = users.find(u => u.id === userId);
  
  if (user) {
    user.xp += points;
    // Update level based on XP
    if (user.xp >= 1000) user.level = 'Platine';
    else if (user.xp >= 800) user.level = 'Or';
    else if (user.xp >= 500) user.level = 'Argent';
    else user.level = 'Bronze';
  }
  
  res.json({
    success: true,
    newXp: user?.xp || 0,
    newLevel: user?.level || 'Bronze',
    earnedPoints: points,
    action: action
  });
});

// 9. GET /api/sos-emergency/:userId - Get emergency assistance info
app.get('/api/sos-emergency/:userId', (req, res) => {
  const user = users.find(u => u.id === req.params.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json({
    emergency: {
      name: user.name,
      phone: user.phone,
      location: user.location,
      emergencyNumber: '+216 25 000 111',
      contracts: contracts.filter(c => c.userId === user.id),
      nearestHealthCenter: {
        name: 'Clinique Médicale Tunis',
        distance: '2.3 km',
        phone: '+216 71 123 456'
      },
      guide: {
        accident: 'Appelez immédiatement: +216 25 000 111. Partagez votre localisation et attendez les secours.',
        medical: 'Rendez-vous au centre médical le plus proche ou appelez une ambulance.',
        theft: 'Signalez le vol à la police locale et contactez MAE Assurances.',
        fire: 'Évacuez les lieux et appelez les pompiers: 198 ou +216 25 000 111'
      }
    }
  });
});

// 10. POST /api/claim/declare - Declare a claim
app.post('/api/claim/declare', (req, res) => {
  const { userId, claimType, description, photos } = req.body;
  
  const claim = {
    id: uuidv4(),
    userId,
    type: claimType,
    description,
    status: 'pending',
    progress: 25,
    createdAt: new Date().toISOString(),
    estimatedResolution: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  };
  
  res.json({
    success: true,
    claim: claim
  });
});

// 11. GET /api/recommendations/:userId - Get recommendations
app.get('/api/recommendations/:userId', (req, res) => {
  const userRecommendations = recommendations.filter(r => r.userId === req.params.userId);
  res.json({ recommendations: userRecommendations });
});

// 12. POST /api/maya/chat - Chat with AI assistant
app.post('/api/maya/chat', (req, res) => {
  const { message, userId } = req.body;
  
  // Simple rule-based responses
  const responses = {
    'garantie': 'Les garanties incluent couverture d\'accident, medical, assistance, et plus. Visitez votre dashboard pour plus de détails.',
    'sinistre': 'Pour déclarer un sinistre, cliquez sur le bouton SOS ou accédez à "Déclarer un sinistre" dans le menu.',
    'couverture': 'Vous pouvez simuler votre couverture en utilisant l\'outil de simulation. Entrez le type de sinistre et l\'amount estimé.',
    'xp': 'Gagnez des points XP en mettant à jour votre profil, lisant les conseils et maintenant de bons comportements préventifs.',
    'default': 'Je suis Maya, votre assistant d\'assurance. Je peux vous aider avec vos garanties, sinistres, et conseils préventifs. Que puis-je faire pour vous?'
  };
  
  const keyword = message.toLowerCase();
  let response = responses['default'];
  
  for (const [key, value] of Object.entries(responses)) {
    if (key !== 'default' && keyword.includes(key)) {
      response = value;
      break;
    }
  }
  
  res.json({
    response: response,
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 InsurSmart Backend running on port ${PORT}`);
});
