import express,{Request,Response,NextFunction} from 'express';
import cors from 'cors';

import { config } from 'dotenv';
import sequelize from './config/database';
import logger from './config/logger';

// Import routes
import authRoutes from './routes/authRoutes';
import bankRoutes from './routes/bankRoutes';
import adminSecondPartyRoutes from './routes/secondPartyRoutes';
import adminAccountHolderRoutes from './routes/accountHolderRoutes';
import adminCheckingAccountRoutes from './routes/checkingAccountRoutes';
import adminFixedDepositRoutes from './routes/fixedDepositRoutes';
import adminTransactionRoutes from './routes/transactionRoutes';



// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import fixedDepositRoutes from './routes/fixedDepositRoutes';
import checkingAccountRoutes from './routes/checkingAccountRoutes';
import transactionRoutes from './routes/transactionRoutes';

// Load environment variables
config();

const app = express();


app.use(cors({
  origin: `${process.env.NODE_ENV==='production'?process.env.CLIENT_URL : 'http://localhost:3000'}`,
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log("Headers:", req.headers);
  console.log("Query:", req.query);
  console.log("Body:", req.body);
  next();
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/banks', bankRoutes);
app.use('/api/second-parties', adminSecondPartyRoutes);
app.use('/api/account-holders', adminAccountHolderRoutes);
app.use('/api/checking-accounts', adminCheckingAccountRoutes);
app.use('/api/fixed-deposits', adminFixedDepositRoutes);
app.use('/api/transactions', adminTransactionRoutes);
app.use('/api/checking-account', checkingAccountRoutes);
app.use('/api/term-deposit', fixedDepositRoutes);
app.use('/api/account-holder/transactions', transactionRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Database connection and server start
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // await sequelize.authenticate();
    // logger.info('Database connection established successfully');

    // // Sync database (use { force: true } only in development to reset database)
    // await sequelize.sync({ alter: true });
    // logger.info('Database synchronized');

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();

export default app;