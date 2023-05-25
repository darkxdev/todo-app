const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const authMiddleware = require('../middleware/auth');

/**
 * Endpoint for creating a new task.
 * POST /
 * Creates a new task with the provided title for the authenticated user.
 */
router.post('/', authMiddleware, async (req, res) => {
  const { title } = req.body;

  try {
    // Create a new task associated with the authenticated user
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

/**
 * Endpoint for retrieving all tasks for the authenticated user.
 * GET /
 * Returns an array of tasks associated with the authenticated user.
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Find all tasks associated with the authenticated user
    const tasks = await Task.findAll({ where: { UserId: req.user.userId } });

    res.status(200).json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * Endpoint for updating a task.
 * PUT /:id
 * Updates the task with the provided ID for the authenticated user.
 */
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    // Find the task with the provided ID and associated with the authenticated user
    const task = await Task.findOne({
      where: { id, UserId: req.user.userId },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update the task properties
    task.title = title;
    task.completed = completed;

    await task.save();

    res.status(200).json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * Endpoint for deleting a task.
 * DELETE /:id
 * Deletes the task with the provided ID for the authenticated user.
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    // Find the task with the provided ID and associated with the authenticated user
    const task = await Task.findOne({
      where: { id, UserId: req.user.userId },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Delete the task
    await task.destroy();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
