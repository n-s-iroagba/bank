import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/dbConfig';
import { CheckingAccount } from './CheckingAccount';
import { SecondParty } from './SecondParty';

export enum TransactionType {
  CREDIT = 'Credit',
  DEBIT = 'Debit',
}

interface TransactionAttributes {
  id: number;
  date: Date;
  description: string;
  secondPartyId: number;
  origin: 'Admin' | 'System' | 'Client';
  amount: number;
  transactionType: TransactionType;
  accountId: number;
}

interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id'> {}

export class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> {
  public id!: number;
  public date!: Date;
  public description!: string;
  public secondPartyId!: number;
  public amount!: number;
  public origin!: 'Admin' | 'System' | 'Client';
  public transactionType!: TransactionType;
  public accountId!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondPartyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: SecondParty, key: 'id' },
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    transactionType: {
      type: DataTypes.ENUM('Credit', 'Debit'),
      allowNull: false,
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: CheckingAccount, key: 'id' },
    },
    origin: {
      type: DataTypes.ENUM('Admin', 'System', 'Client'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'transactions',
    timestamps: true,
  }
);





