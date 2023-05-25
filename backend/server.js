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

User.hasMany(Task);
Task.belongsTo(User);

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch((err) => {
    console.error('Unable to sync the database:', err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
