import pool from '../config/db.js';

// Get all tasks for a user
export const getAllTasksByUser = async (userId) => {
  const { rows } = await pool.query(
    'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return rows;
};

// Get a single task by id and user
export const getTaskByIdAndUser = async (taskId, userId) => {
  const { rows } = await pool.query(
    'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
    [taskId, userId]
  );
  return rows[0];
};

// Create task
export const createTask = async (title, description, userId) => {
  const { rows } = await pool.query(
    'INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
    [title, description, userId]
  );
  return rows[0];
};

// Update task
export const updateTaskByUser = async (taskId, title, description, userId) => {
  const { rows } = await pool.query(
    `UPDATE tasks
     SET title = COALESCE($1, title),
         description = COALESCE($2, description)
     WHERE id = $3 AND user_id = $4
     RETURNING *`,
    [title, description, taskId, userId]
  );
  return rows[0];
};

// Delete task
export const deleteTaskByUser = async (taskId, userId) => {
  const { rowCount } = await pool.query(
    'DELETE FROM tasks WHERE id = $1 AND user_id = $2',
    [taskId, userId]
  );
  return rowCount > 0;
};
