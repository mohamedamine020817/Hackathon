// Error Handler Middleware

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let status = err.status || 500;
  let message = err.message || 'Internal Server Error';
  let code = err.code || 'INTERNAL_ERROR';

  // JSON response
  res.status(status).json({
    error: {
      message,
      code,
      status,
      timestamp: new Date().toISOString()
    }
  });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: {
      message: 'Resource not found',
      code: 'NOT_FOUND',
      status: 404,
      timestamp: new Date().toISOString()
    }
  });
};

module.exports = {
  errorHandler,
  notFoundHandler
};
