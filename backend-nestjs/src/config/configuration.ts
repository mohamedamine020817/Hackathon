// NestJS configuration
export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRATION || '24h',
  },
  environment: process.env.NODE_ENV || 'development',
  apiVersion: 'v1',
});
