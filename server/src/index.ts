// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import { sequelize } from './config/database'; // Your Sequelize instance

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/auth', authRoutes); // Use your auth routes for Admin registration and verification

// Test database connection and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
