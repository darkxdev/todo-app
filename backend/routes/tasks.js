const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const authMiddleware = require('../middleware/auth');

// Create a task
router.post('/', authMiddleware, async (req, res) => {
  const { title } = req.body;

  try {
    const newTask = await Task.create({
      title,
      completed: false,
      UserId: req.user.userId,
    });

    res.status(201).json({ task: newTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Read all tasks
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { UserId: req.user.userId } });

    res.status(200).json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a task
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const task = await Task.findOne({
      where: { id, UserId: req.user.userId },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title;
    task.completed = completed;

    await task.save();

    res.status(200).json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a task
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({
      where: { id, UserId: req.user.userId },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
