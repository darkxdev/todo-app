const { Sequelize } = require('sequelize');

// Create a new instance of Sequelize and configure it
const sequelize = new Sequelize('todo_app_dev', 'postgres', 'database', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
