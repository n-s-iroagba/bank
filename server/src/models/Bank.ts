// models/Bank.ts
import { DataTypes, Model, Optional } from 'sequelize';
import {sequelize} from '../config/dbConfig'
import { SecondParty } from './SecondParty';

export interface BankAttributes {
  id: number;
  name: string;
  logo: string;
  listerId:string;


}

export type CreateBankAttributes = Optional<BankAttributes, 'id'>;

class Bank extends Model<BankAttributes, CreateBankAttributes> implements BankAttributes {
  public id!: number;
  public name!: string;
  public logo!: string;
  public listerId!: string;
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
    listerId: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'banks',
    timestamps: false,
  }
);
Bank.hasMany(
  SecondParty,
  {
    foreignKey: 'bankId',
    as:'secondParties',
  }
)

SecondParty.belongsTo(Bank, {
  foreignKey: 'bankId',
  as: 'bank',
});



export default Bank;
