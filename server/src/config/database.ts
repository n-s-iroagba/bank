import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

// ✅ Only use env variables if running in production
const isProduction = process.env.NODE_ENV === 'production';

const DB_NAME = isProduction ? process.env.DB_NAME : 'bank';
const DB_USER = isProduction ? process.env.DB_USER : 'root';
const DB_PASS = isProduction ? process.env.DB_PASS : '97chocho';
const DB_HOST = isProduction ? process.env.DB_HOST : 'localhost';
const DB_PORT = isProduction ? parseInt(process.env.DB_PORT || '3306') : 3306;


const sequelize = new Sequelize(DB_NAME as string, DB_USER as string, DB_PASS as string, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false, // 👈 only log queries in dev
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
