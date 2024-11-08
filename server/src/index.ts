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

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());


app.use('/admin-route', adminRoutes);
app.use('/account-holder',accountHolderRoutes)
app.use('/bank',bankRoutes);
app.use('/checking-account', checkingAccountRoutes)
app.use('/transactions',transactionRoutes)
app.use('/term-deposit-account', termDepositAccountRoutes)
app.use('/second-party', secondPartyRoutes)

app.use('/', (req: Request, res: Response) => {
  res.send('API is running..ddd.'); 
});




sequelize.sync({force:true}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})