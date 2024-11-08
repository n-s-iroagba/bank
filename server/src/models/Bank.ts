// models/Bank.ts
import { DataTypes, Model, Optional } from 'sequelize';
import {sequelize} from '../config/dbConfig'
import { SecondParty } from './SecondParty';

interface BankAttributes {
  id: number;
  name: string;
  logo: string;
}

export type CreateBankAttributes = Optional<BankAttributes, 'id'>;

class Bank extends Model<BankAttributes, CreateBankAttributes> implements BankAttributes {
  public id!: number;
  public name!: string;
  public logo!: string;
}

Bank.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Bank',
    tableName: 'banks',
    timestamps: false,
  }
);



export default Bank;
