import {
  Model,
  DataTypes,
  Optional,
  HasManyAddAssociationMixin,
  ForeignKey,
} from 'sequelize';
import { sequelize } from '../config/dbConfig';
import { AccountHolder } from './AccountHolder'; // Import AccountHolder model

// Interface for the attributes of the Account
interface AccountAttributes {
  id: number;
  amountDeposited: number;
  startDate: Date;
  durationInDays: number;
  interestRate: number;
  accountHolderId: number; 
  accountNumber:number;
}

// Optional fields when creating a new Account instance
interface AccountCreationAttributes extends Optional<AccountAttributes, 'id'> {}

// The Account model itself
export class TermDepositAccount
  extends Model<AccountAttributes, AccountCreationAttributes>
  implements AccountAttributes
{
  public startDate!: Date;
  public durationInDays!: number;
  public interestRate!: number;
  public id!: number;
  public accountNumber!:number;
  public amountDeposited!: number;
  public accountHolderId!: number; // Foreign key to AccountHolder



  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the TermDepositAccount model
TermDepositAccount.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amountDeposited: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    durationInDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    interestRate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    accountNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    accountHolderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'accountHolder', 
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'TermDepositAccount',
    tableName: 'term_deposit_accounts',
    timestamps: true,
  }
);

// Set up associations

  