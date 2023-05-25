const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a new instance of Sequelize and configure it
const sequelize = new Sequelize(process.env.DB_LINK);

module.exports = sequelize;
