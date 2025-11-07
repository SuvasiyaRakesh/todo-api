import * as Task from '../models/taskModel.js';

// Get all tasks for logged-in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.getAllTasksByUser(req.user.id);
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
};

// Get single task
export const getTask = async (req, res) => {
  try {
    const task = await Task.getTaskByIdAndUser(req.params.id, req.user.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching task' });
  }
};

// Add task
export const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const task = await Task.createTask(title, description, req.user.id);
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while creating task' });
  }
};

// Update task
export const editTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title && !description) return res.status(400).json({ message: 'Nothing to update' });

    const updatedTask = await Task.updateTaskByUser(
      req.params.id,
      title,
      description,
      req.user.id
    );
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while updating task' });
  }
};

// Delete task
export const removeTask = async (req, res) => {
  try {
    const deleted = await Task.deleteTaskByUser(req.params.id, req.user.id);
    if (!deleted) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while deleting task' });
  }
};
