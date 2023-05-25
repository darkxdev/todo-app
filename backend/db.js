const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a new instance of Sequelize and configure it
const sequelize = new Sequelize(process.env.DB_NAME || 'todo_app_dev', process.env.DB_USERNAME || 'postgres', process.env.DB_PASSWORD || 'database', {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
