import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { generateAccountNumber } from '../utils/helpers';

export interface CheckingAccountAttributes {
  id: number;
  accountNumber: string;
  balance: number;
  accountHolderId: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CheckingAccountCreationAttributes extends Optional<CheckingAccountAttributes, 'id' | 'accountNumber' | 'balance' | 'isActive' | 'createdAt' | 'updatedAt'> {}

export class CheckingAccount extends Model<CheckingAccountAttributes, CheckingAccountCreationAttributes> implements CheckingAccountAttributes {
  public id!: number;
  public accountNumber!: string;
  public balance!: number;
  public accountHolderId!: number;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Model initialization
  public static initialize(sequelize: Sequelize) {
    const CheckingAccount = this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        accountNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          defaultValue: () => generateAccountNumber(),
        },
        balance: {
          type: DataTypes.DECIMAL(12, 2),
          allowNull: false,
          defaultValue: 0.0,
          validate: {
            min: 0,
          },
        },
        accountHolderId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'account_holders',
            key: 'id',
          },
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        tableName: 'checking_accounts',
        sequelize,
      }
    );

    return CheckingAccount;
  }

  // Associations
  public static associate(models: any) {
    CheckingAccount.belongsTo(models.AccountHolder, {
      foreignKey: 'accountHolderId',
      as: 'accountHolder',
    });

    CheckingAccount.hasMany(models.Transaction, {
      foreignKey: 'checkingAccountId',
      as: 'transactions',
    });
  }
}

export default CheckingAccount;