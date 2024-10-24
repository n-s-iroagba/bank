import { Request,Response } from 'express';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

import adminRoutes from './routes/adminRoutes';
import { sequelize } from './config/dbConfig';
import accountRoutes from './routes/accountRoutes';
import clientRoutes from './routes/clientRoutes'

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use('/api/clients', clientRoutes); // This should be the last route to catch all unmatched routes

app.use('/api/accounts', accountRoutes);     // More specific route
app.use('/api', adminRoutes);                // More specific route

app.use('/', (req: Request, res: Response) => {
  res.send('API is running..ddd.'); // This should be the last route to catch all unmatched routes
});




sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
