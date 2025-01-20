import { Request,Response } from 'express';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { sequelize } from './config/dbConfig';
import adminRoutes from './routes/adminRoutes';
import accountHolderRoutes from './routes/accounHolderRoutes';
import checkingAccountRoutes from './routes/checkingAccountRoutes';
import transactionRoutes from './routes/transactionRoutes';
import termDepositAccountRoutes from './routes/termDepositAccountRoutes';
import secondPartyRouter from './routes/secondPartyRouter';
import bankRouter from './routes/BankRoutes';
import superAdminRoutes from './routes/superAdminRoutes';

const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: 'http://localhost:3000' // or the URL of your React app
}));

app.use(bodyParser.json());
app.use('/', superAdminRoutes); 

app.use ('/super-admin',superAdminRoutes)
app.use('/admin', adminRoutes);
app.use('/account-holder',accountHolderRoutes)
app.use('/bank',bankRouter);
app.use('/checking-account', checkingAccountRoutes)
app.use('/transaction',transactionRoutes)
app.use('/term-deposit-account', termDepositAccountRoutes)
app.use('/second-party', secondPartyRouter)


sequelize.sync({
  force:true
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})

