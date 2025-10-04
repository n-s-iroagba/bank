import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { generateAccountNumber } from '../utils/helpers';

export interface FixedTermDepositAttributes {
  id: number;
  accountNumber: string;
  balance: number;
  term: number; // in months
  interestRate: number;
  maturityDate: Date;
  accountHolderId: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FixedTermDepositCreationAttributes extends Optional<FixedTermDepositAttributes, 'id' | 'accountNumber' | 'balance' | 'maturityDate' | 'isActive' | 'createdAt' | 'updatedAt'> {}

export class FixedTermDeposit extends Model<FixedTermDepositAttributes, FixedTermDepositCreationAttributes> implements FixedTermDepositAttributes {
  public id!: number;
  public accountNumber!: string;
  public balance!: number;
  public term!: number;
  public interestRate!: number;
  public maturityDate!: Date;
  public accountHolderId!: number;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Model initialization
  public static initialize(sequelize: Sequelize) {
    const FixedTermDeposit = this.init(
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
        term: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
          },
        },
        interestRate: {
          type: DataTypes.DECIMAL(5, 2),
          allowNull: false,
          validate: {
            min: 0,
          },
        },
        maturityDate: {
          type: DataTypes.DATE,
          allowNull: false,
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
        tableName: 'fixed_term_deposits',
        sequelize,
        hooks: {
          beforeValidate: (fixedTermDeposit: FixedTermDeposit) => {
            if (fixedTermDeposit.term && fixedTermDeposit.createdAt) {
              const maturityDate = new Date(fixedTermDeposit.createdAt);
              maturityDate.setMonth(maturityDate.getMonth() + fixedTermDeposit.term);
              fixedTermDeposit.maturityDate = maturityDate;
            }
          },
        },
      }
    );

    return FixedTermDeposit;
  }

  // Associations
  public static associate(models: any) {
    FixedTermDeposit.belongsTo(models.AccountHolder, {
      foreignKey: 'accountHolderId',
      as: 'accountHolder',
    });
  }
}

export default FixedTermDeposit;