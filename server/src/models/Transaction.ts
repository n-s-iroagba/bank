import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/dbConfig';
import { CheckingAccount } from './CheckingAccount';
import { SecondParty } from './SecondParty';
import { TransactionOrigin, TransactionType } from '../types/TransactionType';




interface TransactionAttributes {
  id: number;
  date: Date;
  description: string;
  secondPartyId: number;
  origin: TransactionOrigin;
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
  public origin!: TransactionOrigin;
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
      references: { model: 'second_parties', key: 'id' },
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
      references: { model: 'checking_accounts', key: 'id' },
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





