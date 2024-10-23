
import express from 'express';
import bodyParser from 'body-parser';

import adminRoutes from './routes/adminRoutes';
import { sequelize } from './config/dbConfig';
import accountRoutes from './routes/accountRoutes';
import clientRoutes from './routes/clientRoutes'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', adminRoutes); 
app.use('/api/accounts', accountRoutes);
app.use('/api/clients', clientRoutes)


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
