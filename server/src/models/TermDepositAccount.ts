import {
  Model,
  DataTypes,
  Optional,
  HasManyAddAssociationMixin,
  ForeignKey,
} from 'sequelize';
import { sequelize } from '../config/dbConfig';

interface AccountAttributes {
  id: number;
  amountDeposited: number;
  depositDate: Date;
  payoutDate: Date;
  interestRate: number;
  accountHolderId: number; 
  accountNumber:string;
}

interface AccountCreationAttributes extends Optional<AccountAttributes, 'id'> {}


export class TermDepositAccount
  extends Model<AccountAttributes, AccountCreationAttributes>
  implements AccountAttributes
{
  public depositDate!: Date;
  public payoutDate!: Date;
  public interestRate!: number;
  public id!: number;
  public accountNumber!:string;
  public amountDeposited!: number;
  public accumulatedYield!: number;
  public isLocked!: boolean;
  public earlyWithdrawalPenalty!: number;
  public accountHolderId!: number;
  public termId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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
    payoutDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    depositDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    interestRate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
    },
    accountHolderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'accountHolders', 
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'term_deposit_accounts',
    timestamps: true,
  }
);

// Set up associations

  