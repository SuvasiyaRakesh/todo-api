import app from './app.js';
import dotenv from 'dotenv';
import './jobs/taskChecker.js'; // Cron job for checking tasks

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  const timestamp = new Date().toISOString();

  console.clear();
  console.log('------------------------------------------------------------');
  console.log('Todo API Server');
  console.log('------------------------------------------------------------');
  console.log(`Status      : Running`);
  console.log(`Port        : ${PORT}`);
  console.log(`Environment : ${process.env.NODE_ENV || 'development'}`);
  console.log(`Started At  : ${timestamp}`);
  console.log('------------------------------------------------------------');
  console.log('Scheduler   : Task checker is running...');
  console.log('------------------------------------------------------------');
});

// Optional: Graceful shutdown for clean exit
process.on('SIGINT', () => {
  console.log('\nServer shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nServer shutting down gracefully...');
  process.exit(0);
});
