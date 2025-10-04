import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface TransactionAttributes {
  id: number;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  checkingAccountId: number;
  secondPartyId: number;
  balanceAfter: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id' | 'balanceAfter' | 'createdAt' | 'updatedAt'> {}

export class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
  public id!: number;
  public type!: 'debit' | 'credit';
  public amount!: number;
  public description!: string;
  public checkingAccountId!: number;
  public secondPartyId!: number;
  public balanceAfter!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Model initialization
  public static initialize(sequelize: Sequelize) {
    const Transaction = this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        type: {
          type: DataTypes.ENUM('debit', 'credit'),
          allowNull: false,
        },
        amount: {
          type: DataTypes.DECIMAL(12, 2),
          allowNull: false,
          validate: {
            min: 0.01,
          },
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        checkingAccountId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'checking_accounts',
            key: 'id',
          },
        },
        secondPartyId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'second_parties',
            key: 'id',
          },
        },
        balanceAfter: {
          type: DataTypes.DECIMAL(12, 2),
          allowNull: false,
        },
      },
      {
        tableName: 'transactions',
        sequelize,
      }
    );

    return Transaction;
  }

  // Associations
  public static associate(models: any) {
    Transaction.belongsTo(models.CheckingAccount, {
      foreignKey: 'checkingAccountId',
      as: 'checkingAccount',
    });

    Transaction.belongsTo(models.SecondParty, {
      foreignKey: 'secondPartyId',
      as: 'secondParty',
    });
  }
}

export default Transaction;