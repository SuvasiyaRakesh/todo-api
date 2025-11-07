import cron from 'node-cron';
import pool from '../config/db.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Logging helper
const log = (type, message) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${type}: ${message}`);
};

// Function to fetch recent tasks
const getRecentTasks = async () => {
  const query = "SELECT * FROM tasks WHERE created_at >= NOW() - INTERVAL '5 minutes'";
  const { rows } = await pool.query(query);
  return rows;
};

// Function to send email notification
const sendNotification = async (taskCount) => {
  const message = `${taskCount} new task(s) added recently.`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Tasks Added',
    text: message,
  });

  log('Notification', `${message} Email sent successfully.`);
};

// Cron job: runs every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  log('Scheduler', 'Checking for new tasks...');

  try {
    const tasks = await getRecentTasks();

    if (tasks.length > 0) {
      await sendNotification(tasks.length);
    } else {
      log('Scheduler', 'No new tasks found.');
    }
  } catch (error) {
    log('Error', error.message);
  }
});
