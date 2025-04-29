import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';

async function startServer() {
  await AppDataSource.initialize();
  console.log('✅ Database connected!');

  await AppDataSource.runMigrations();
  console.log('📦 Migrations executed!');

  const app = express();
  app.use(express.json());
  app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
}

startServer().catch((error) => {
  console.error('❌ Failed to start server:', error);
});