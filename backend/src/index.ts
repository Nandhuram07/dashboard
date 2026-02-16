import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import dataRoutes from './routes/dataRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', dataRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Blackcoffer API is running' });
});

// Start server if not running in serverless mode
if (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY) {
  const startServer = async () => {
    try {
      await connectDatabase();
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  };
  startServer();
}

export default app;
