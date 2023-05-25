const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * Task model definition.
 * Represents a task in the database.
 */
const Task = sequelize.define('Task', {
  // Define the 'title' attribute of type STRING
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Define the 'completed' attribute of type BOOLEAN
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

// Export the Task model
module.exports = Task;
