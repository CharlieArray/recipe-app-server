module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
     DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres@localhost/recipe-app",
     JWT_SECRET: process.env.JWT_SECRET || 'key 12345',
     JWT_EXPIRY: process.env.JWT_EXPIRY || '1d'
}