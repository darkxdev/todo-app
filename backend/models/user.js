const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * User model definition.
 * Represents a user in the database.
 */
const User = sequelize.define('User', {
  // Define the 'username' attribute of type STRING
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  // Define the 'password' attribute of type STRING
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Export the User model
module.exports = User;
