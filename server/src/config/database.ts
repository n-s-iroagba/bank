import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();


const sequelize = new Sequelize(
  process.env.DB_NAME as string||'bank',
  process.env.DB_USER as string||'root',
  process.env.DB_PASS as string||'97chocho',
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : true,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export default sequelize;

