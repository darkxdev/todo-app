const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todo_app_dev', 'postgres', 'database', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
