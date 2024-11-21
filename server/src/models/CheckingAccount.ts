import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig';
import { AccountHolder } from './AccountHolder';
import { Transaction } from './Transaction';
type TCheckingAccount = {
    id: number;
  accountHolderId: number;
  balance: number;
  accountNumber: string;
}
type CreationTCheckingAccount = Omit<TCheckingAccount,'id'>
export class CheckingAccount extends Model<TCheckingAccount,CreationTCheckingAccount> {
  public id!: number;
  public accountHolderId!: number;
  public balance!: number;
  public accountNumber!: string;

  // Associations
  public transactions?: Transaction[];
  public accountHolder!: AccountHolder;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CheckingAccount.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    accountHolderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: AccountHolder, key: 'id' },
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    sequelize,
    tableName: 'checking_accounts',
    timestamps: true,
  }
);

CheckingAccount.hasMany(Transaction, {
  foreignKey: 'accountId',
  as: 'transactions',
});

Transaction.belongsTo(CheckingAccount, {
  foreignKey: 'accountId',
  as: 'account',
});







