// /src/config/database.ts
import * as dotenv from 'dotenv'
import path from 'path';
import { Sequelize } from 'sequelize';
const env = process.env.NODE_ENV || 'development';


dotenv.config({ path: path.resolve(__dirname, `../.env.${env}`) });
;

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!, {
  host: process.env.DB_HOST,
  dialect: 'mysql', 
});

export { sequelize };
