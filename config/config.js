const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'admin',
    password: 'Admin@123',
    database: 'pacom',
    host: 'db',
    port: '5432',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
};
