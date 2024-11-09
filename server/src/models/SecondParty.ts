// models/SecondParty.ts
import { Model, DataTypes, BelongsTo } from 'sequelize';
import { sequelize } from '../config/dbConfig';
import Bank  from './Bank';
import { Transaction } from './Transaction';

export class SecondParty extends Model {
  public id!: number;
  public firstname!: string;
  public lastname!: string;
  public accountNumber!: number;
  public bankId!: number;
}

SecondParty.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
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



