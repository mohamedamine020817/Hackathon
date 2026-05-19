const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// Import models et utilities
const User = require('./models/User');
const Contract = require('./models/Contract');
const Claim = require('./models/Claim');
const ScoreCalculator = require('./utils/scoreCalculator');
const { validateUserId, validateClaimData, validateSimulationData, validateXPData } = require('./middleware/validation');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ==================== MOCK DATABASE ====================

// Initialize mock database with enhanced data
const mockData = {
  users: [
    new User({
      id: '1',
      name: 'Sarah Belhadj',
      email: 'sarah@example.com',
      phone: '+216 98 123 456',
      age: 22,
      location: 'Tunis',
      contracts: ['CONT-001', 'CONT-002'],
      xp: 450,
      preventionScore: 72,
      riskProfile: 'low',
      createdAt: '2023-06-15T10:30:00Z'
    }),
    new User({
      id: '2',
      name: 'Karim Bouali',
      email: 'karim@example.com',
      phone: '+216 98 234 567',
      age: 41,
      location: 'Sfax',
      contracts: ['CONT-003', 'CONT-004'],
      xp: 820,
      preventionScore: 85,
      riskProfile: 'medium',
      createdAt: '2022-03-20T14:00:00Z'
    })
  ],

  contracts: [
    new Contract({
      id: 'CONT-001',
      userId: '1',
      type: 'travel',
      premium: 45.50,
      status: 'active',
      coverage: 85,
      startDate: '2024-01-15',
      endDate: '2025-01-15',
      guarantees: ['Accident', 'Medical', 'Luggage'],
      deductible: 50,
      maxCoverage: 50000
    }),
    new Contract({
      id: 'CONT-002',
      userId: '1',
      type: 'home',
      premium: 120.00,
      status: 'active',
      coverage: 70,
      startDate: '2024-03-01',
      endDate: '2025-03-01',
      guarantees: ['Fire', 'Flood', 'Theft'],
      deductible: 100,
      maxCoverage: 300000
    }),
    new Contract({
      id: 'CONT-003',
      userId: '2',
      type: 'auto',
      premium: 180.50,
      status: 'active',
      coverage: 95,
      startDate: '2024-02-10',
      endDate: '2025-02-10',
      guarantees: ['Collision', 'Liability', 'Assistance'],
      deductible: 200,
      maxCoverage: 1000000
    }),
    new Contract({
      id: 'CONT-004',
      userId: '2',
      type: 'health',
      premium: 65.00,
      status: 'active',
      coverage: 80,
      startDate: '2024-01-01',
      endDate: '2025-01-01',
      guarantees: ['Doctor', 'Hospital', 'Emergency'],
      deductible: 0,
      maxCoverage: 500000
    })
  ],

  claims: [
    new Claim({
      contractId: 'CONT-001',
      userId: '1',
      type: 'medical',
      status: 'approved',
      amount: 450,
      description: 'Consultation médicale à l\'étranger',
      estimatedAmount: 500,
      approvedAmount: 450,
      priority: 'normal'
    })
  ],

  alerts: [
    {
      id: uuidv4(),
      userId: '1',
      type: 'weather',
      title: '⛈️ Alerte Météo - Risque de tempête',
      message: 'Risque de tempête dans votre région demain. Pensez à protéger votre domicile.',
      severity: 'high',
      read: false,
      category: 'prevention',
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      userId: '1',
      type: 'reminder',
      title: '📅 Rappel - Renouvellement Contrat',
      message: 'Votre contrat voyage expire dans 30 jours. Pensez à le renouveler.',
      severity: 'medium',
      read: false,
      category: 'admin',
      createdAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      userId: '1',
      type: 'recommendation',
      title: '💡 Conseil - Augmentez votre couverture',
      message: 'Nous vous recommandons d\'augmenter votre couverture habitation à 80%.',
      severity: 'low',
      read: false,
      category: 'recommendation',
      createdAt: new Date().toISOString()
    }
  ],

  badges: [
    {
      id: 'BADGE-001',
      name: 'Explorateur',
      description: 'Vous avez testé toutes les fonctionnalités',
      icon: '🗺️',
      unlocked: true,
      unlockedDate: new Date().toISOString()
    },
    {
      id: 'BADGE-002',
      name: 'Économe',
      description: 'Vous avez une couverture optimale',
      icon: '💰',
      unlocked: true,
      unlockedDate: new Date().toISOString()
    },
    {
      id: 'BADGE-003',
      name: 'Prudent',
      description: 'Score de prévention supérieur à 80',
      icon: '🛡️',
      unlocked: false
    }
  ]
};

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '2.0.0'
  });
});

// ==================== USER ENDPOINTS ====================

// Get user with all related data
app.get('/api/user/:userId', validateUserId, (req, res) => {
  const { userId } = req.params;
  
  const user = mockData.users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({
      error: 'User not found',
      code: 'USER_NOT_FOUND'
    });
  }

  const userContracts = mockData.contracts.filter(c => c.userId === userId);
  const userClaims = mockData.claims.filter(c => c.userId === userId);
  const userAlerts = mockData.alerts.filter(a => a.userId === userId);

  // Calculate prevention score
  const scoreData = ScoreCalculator.calculatePreventionScore(user, userContracts, userClaims);

  res.json({
    user: user.toJSON(),
    contracts: userContracts.map(c => c.toJSON()),
    claims: userClaims.map(c => c.toJSON()),
    alerts: userAlerts,
    score: scoreData
  });
});

// Update user preferences
app.put('/api/user/:userId/preferences', validateUserId, (req, res) => {
  const { userId } = req.params;
  const { preferences } = req.body;

  const user = mockData.users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.preferences = { ...user.preferences, ...preferences };
  user.lastUpdate = new Date().toISOString();

  res.json({
    message: 'Preferences updated',
    preferences: user.preferences
  });
});

// ==================== PREVENTION SCORE ====================

app.get('/api/prevention-score/:userId', validateUserId, (req, res) => {
  const { userId } = req.params;
  
  const user = mockData.users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const userContracts = mockData.contracts.filter(c => c.userId === userId);
  const userClaims = mockData.claims.filter(c => c.userId === userId);

  const scoreData = ScoreCalculator.calculatePreventionScore(user, userContracts, userClaims);

  res.json({
    score: scoreData.score,
    breakdown: scoreData.breakdown,
    trend: scoreData.trend,
    riskLevel: scoreData.riskLevel,
    lastUpdated: new Date().toISOString()
  });
});

// ==================== CONTRACTS ====================

app.get('/api/contracts/:userId', validateUserId, (req, res) => {
  const { userId } = req.params;
  
  const userContracts = mockData.contracts.filter(c => c.userId === userId);
  
  res.json({
    contracts: userContracts.map(c => c.toJSON()),
    total: userContracts.length,
    active: userContracts.filter(c => c.getStatus() === 'active').length
  });
});

app.get('/api/contract/:contractId', (req, res) => {
  const { contractId } = req.params;
  
  const contract = mockData.contracts.find(c => c.id === contractId);
  if (!contract) {
    return res.status(404).json({ error: 'Contract not found' });
  }

  res.json(contract.toJSON());
});

// ==================== ALERTS ====================

app.get('/api/alerts/:userId', validateUserId, (req, res) => {
  const { userId } = req.params;
  
  const userAlerts = mockData.alerts.filter(a => a.userId === userId);
  
  res.json({
    alerts: userAlerts,
    total: userAlerts.length,
    unread: userAlerts.filter(a => !a.read).length
  });
});

app.put('/api/alerts/:alertId/read', (req, res) => {
  const { alertId } = req.params;
  
  const alert = mockData.alerts.find(a => a.id === alertId);
  if (!alert) {
    return res.status(404).json({ error: 'Alert not found' });
  }

  alert.read = true;
  
  res.json({
    message: 'Alert marked as read',
    alert
  });
});

// ==================== COVERAGE SIMULATION ====================

app.post('/api/coverage-simulation', validateSimulationData, (req, res) => {
  const { estimatedAmount, coveragePercentage, contractType } = req.body;
  
  const reimbursed = Math.round((estimatedAmount * coveragePercentage) / 100);
  const notCovered = estimatedAmount - reimbursed;

  res.json({
    estimatedAmount: Math.round(estimatedAmount),
    coveragePercentage,
    reimbursed,
    notCovered,
    deductible: contractType === 'auto' ? 200 : contractType === 'home' ? 100 : 50,
    afterDeductible: Math.max(0, reimbursed - (contractType === 'auto' ? 200 : contractType === 'home' ? 100 : 50)),
    timestamp: new Date().toISOString()
  });
});

// ==================== CLAIMS ====================

app.post('/api/claim/declare', validateClaimData, (req, res) => {
  const { userId, contractId, type, description, estimatedAmount } = req.body;

  const contract = mockData.contracts.find(c => c.id === contractId);
  if (!contract) {
    return res.status(404).json({ error: 'Contract not found' });
  }

  const claim = new Claim({
    contractId,
    userId,
    type,
    description,
    estimatedAmount: estimatedAmount || 0,
    priority: estimatedAmount > 10000 ? 'high' : 'normal'
  });

  mockData.claims.push(claim);

  res.status(201).json({
    message: 'Claim declared successfully',
    claim: claim.toJSON(),
    reference: claim.id
  });
});

app.get('/api/claims/:userId', validateUserId, (req, res) => {
  const { userId } = req.params;
  
  const userClaims = mockData.claims.filter(c => c.userId === userId);
  
  res.json({
    claims: userClaims.map(c => c.toJSON()),
    total: userClaims.length,
    pending: userClaims.filter(c => c.status === 'pending').length,
    approved: userClaims.filter(c => c.status === 'approved').length
  });
});

// ==================== XP & GAMIFICATION ====================

app.post('/api/xp/add', validateXPData, (req, res) => {
  const { userId, points, action } = req.body;
  
  const user = mockData.users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const result = user.addXP(points);

  res.json({
    message: `${points} XP added`,
    action,
    xp: result.xp,
    level: result.level,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/badges', (req, res) => {
  res.json({
    badges: mockData.badges,
    total: mockData.badges.length,
    unlocked: mockData.badges.filter(b => b.unlocked).length
  });
});

app.get('/api/leaderboard', (req, res) => {
  const sorted = [...mockData.users]
    .sort((a, b) => b.xp - a.xp)
    .slice(0, 10)
    .map((u, idx) => ({
      rank: idx + 1,
      name: u.name,
      xp: u.xp,
      level: u.level,
      score: u.preventionScore
    }));

  res.json({
    leaderboard: sorted,
    timestamp: new Date().toISOString()
  });
});

// ==================== SOS & EMERGENCY ====================

app.get('/api/sos-emergency/:userId', validateUserId, (req, res) => {
  res.json({
    emergency: {
      policeNumber: '197',
      ambulanceNumber: '192',
      fireNumber: '193',
      nearestHospital: {
        name: 'Hôpital Habib Bourguiba',
        address: 'Avenue de l\'environnement, Tunis',
        distance: '2.5 km',
        phone: '+216 71 561 000'
      }
    },
    guides: {
      accident: [
        'Alertez les secours immédiatement',
        'Assurez-vous de la sécurité des personnes',
        'Prenez des photos des dégâts',
        'Collectez les coordonnées des témoins'
      ],
      medical: [
        'Appelez le 192 (Ambulance)',
        'Restez calm et donnez les symptômes',
        'Informez du lieu et de l\'accès',
        'Notifiez les proches'
      ],
      theft: [
        'Signalez à la police locale',
        'Conservez le rapport d\'incident',
        'Documentez les biens volés',
        'Informez votre assureur'
      ],
      fire: [
        'Évacuez immédiatement',
        'Appelez les pompiers: 193',
        'Aidez les autres à sortir',
        'Attendez les secours dehors'
      ]
    },
    timestamp: new Date().toISOString()
  });
});

// ==================== MAYA ASSISTANT ====================

app.post('/api/maya/chat', (req, res) => {
  const { message } = req.body;

  const responses = {
    'garantie': 'Nos garanties incluent l\'assistance 24/7, la couverture médicale, et bien plus. Quel type de garantie vous intéresse?',
    'sinistre': 'Pour déclarer un sinistre, utilisez la section "Déclarer Sinistre" ou contactez-nous au 71 561 000.',
    'couverture': 'Votre couverture actuelle est optimale. Vous pouvez la simuler avec notre outil de simulation.',
    'xp': 'Vous gagnez des XP en interagissant avec l\'app! Déclarez des sinistres, mettez à jour votre profil, et lisez nos conseils.',
    'prix': 'Nos tarifs varient selon votre profil de risque et vos besoins. Demandez-nous un devis personnalisé!',
    'default': 'Je suis Maya, votre assistant IA. Je suis ici pour répondre à vos questions sur vos assurances MAE. Comment puis-je vous aider?'
  };

  let response = responses.default;
  const lowerMessage = message.toLowerCase();

  for (const [key, value] of Object.entries(responses)) {
    if (key !== 'default' && lowerMessage.includes(key)) {
      response = value;
      break;
    }
  }

  res.json({
    message: response,
    timestamp: new Date().toISOString(),
    typing: false
  });
});

// ==================== ANALYTICS & STATISTICS ====================

app.get('/api/analytics/:userId', validateUserId, (req, res) => {
  const { userId } = req.params;

  const user = mockData.users.find(u => u.id === userId);
  const userContracts = mockData.contracts.filter(c => c.userId === userId);
  const userClaims = mockData.claims.filter(c => c.userId === userId);

  const totalPremiums = userContracts.reduce((sum, c) => sum + c.premium, 0);
  const totalClaims = userClaims.reduce((sum, c) => sum + (c.approvedAmount || 0), 0);

  res.json({
    analytics: {
      totalContracts: userContracts.length,
      totalPremiums: Math.round(totalPremiums * 100) / 100,
      totalClaims,
      claimsCount: userClaims.length,
      avgCoverage: Math.round(userContracts.reduce((sum, c) => sum + c.coverage, 0) / userContracts.length),
      xp: user.xp,
      level: user.level,
      preventionScore: user.preventionScore
    },
    lastUpdated: new Date().toISOString()
  });
});

// ==================== ERROR HANDLING ====================

app.use(notFoundHandler);
app.use(errorHandler);

// ==================== SERVER START ====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 InsurSmart Backend running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API Health: http://localhost:${PORT}/api/health`);
});

module.exports = app;
