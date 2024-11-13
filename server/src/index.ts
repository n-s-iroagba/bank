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
import secondPartyRoutes from './routes/secondPartyRoutes';
import bankRoutes from './routes/BankRoutes';
import { developmentIndexHandlerNoAuth, indexController } from './controllers/indexController';
import superAdminRoutes from './routes/superAdminRoutes';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

app.use ('/superadmin',superAdminRoutes)
app.use('/admin', adminRoutes);
app.use('/account-holder',accountHolderRoutes)
app.use('/bank',bankRoutes);
app.use('/checking-account', checkingAccountRoutes)
app.use('/transaction',transactionRoutes)
app.use('/term-deposit-account', termDepositAccountRoutes)
app.use('/second-party', secondPartyRoutes)

app.get('/', async (req: Request, res: Response) => {
  try {
    await developmentIndexHandlerNoAuth();
    console.log('Data inserted successfully');
    res.send('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Error inserting data');
  }
});






sequelize.sync({
  force:true
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})

