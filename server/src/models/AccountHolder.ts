
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig'; 
import { CheckingAccount } from './CheckingAccount';

export class AccountHolder extends Model {
  public id!: number;
  public firstname!: string;
  public surname!: string;
  public middlename?: string;
  public username!: string;
  public password!: string;
  public checkingAccount?: CheckingAccount;
}






AccountHolder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surName: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'accountHolder',
  }
);
