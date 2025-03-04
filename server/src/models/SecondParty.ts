// models/SecondParty.ts
import { Model, DataTypes, BelongsTo } from 'sequelize';
import { sequelize } from '../config/dbConfig';
import Bank  from './Bank';
import { Transaction } from './Transaction';
type TSecondParty={
  id:number;
  firstName: string;
  surname: string;
  accountNumber: number;
  bankId: number;
  adminId: number;

}
type CreationTSecondParty = Omit<TSecondParty,'id'>
export class SecondParty extends Model<TSecondParty,CreationTSecondParty> {
  public id!: number;
  public firstName!: string;
  public surname!: string;
  public accountNumber!: number;
  public bankId!: number;
  public bank!: Bank;

  public adminId!: number;
}

SecondParty.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'banks', key: 'id' },
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'admins', key: 'id' },
    },
    accountNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'second_parties',
  }
);
SecondParty.hasMany(Transaction, {
  foreignKey:'secondPartyId',
  as: 'transactions',
});


Transaction.belongsTo(SecondParty, {
  foreignKey: 'secondPartyId',
  as: 'secondParty',
});



