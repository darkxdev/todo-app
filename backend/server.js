const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./db');
const User = require('./models/user');
const Task = require('./models/task');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

app.use(cors());
app.use(express.json());

// Define the associations between User and Task models
User.hasMany(Task);
Task.belongsTo(User);

// Mount the authentication routes
app.use('/auth', authRoutes);

// Mount the task routes
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

// Sync the database models with the database
sequelize
  .sync()
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch((err) => {
    console.error('Unable to sync the database:', err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
