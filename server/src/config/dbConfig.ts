// /src/config/database.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!, {
  host: process.env.DB_HOST,
  dialect: 'mysql', // or your database dialect
});

export { sequelize };
