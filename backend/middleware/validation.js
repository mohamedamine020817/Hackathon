// Validation Middleware

const validateUserId = (req, res, next) => {
  const { userId } = req.params;
  if (!userId || isNaN(userId)) {
    return res.status(400).json({
      error: 'Invalid user ID',
      code: 'INVALID_USER_ID'
    });
  }
  next();
};

const validateClaimData = (req, res, next) => {
  const { type, description, contractId } = req.body;
  
  const validClaimTypes = ['accident', 'theft', 'flood', 'fire', 'medical'];
  
  if (!type || !validClaimTypes.includes(type)) {
    return res.status(400).json({
      error: 'Invalid claim type',
      code: 'INVALID_CLAIM_TYPE'
    });
  }

  if (!description || description.trim().length < 10) {
    return res.status(400).json({
      error: 'Description must be at least 10 characters',
      code: 'INVALID_DESCRIPTION'
    });
  }

  if (!contractId) {
    return res.status(400).json({
      error: 'Contract ID is required',
      code: 'MISSING_CONTRACT_ID'
    });
  }

  next();
};

const validateSimulationData = (req, res, next) => {
  const { estimatedAmount, coveragePercentage, contractType } = req.body;
  
  if (!estimatedAmount || estimatedAmount < 0 || estimatedAmount > 1000000) {
    return res.status(400).json({
      error: 'Invalid estimated amount',
      code: 'INVALID_AMOUNT'
    });
  }

  if (!coveragePercentage || coveragePercentage < 0 || coveragePercentage > 100) {
    return res.status(400).json({
      error: 'Invalid coverage percentage',
      code: 'INVALID_COVERAGE'
    });
  }

  next();
};

const validateXPData = (req, res, next) => {
  const { userId, points, action } = req.body;
  
  if (!userId || !points || points < 0 || points > 500) {
    return res.status(400).json({
      error: 'Invalid XP data',
      code: 'INVALID_XP_DATA'
    });
  }

  next();
};

module.exports = {
  validateUserId,
  validateClaimData,
  validateSimulationData,
  validateXPData
};
