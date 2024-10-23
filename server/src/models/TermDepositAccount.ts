import {
    Model,
    DataTypes,
    Optional,
    HasManyAddAssociationMixin,
  } from 'sequelize';
import { sequelize } from '../config/dbConfig';
import { Transfer } from './Transfer';

  
  // Interface for the attributes of the Account
  interface AccountAttributes {
    id: number;
    amountDeposited: number;
    startDate: string;
    endDate: string;
    percentageIncrease: number;
    clientId: number;
  }
  
  // Optional fields when creating a new Account instance
  interface AccountCreationAttributes
    extends Optional<AccountAttributes, 'id'> {}
  
  // The Account model itself
  export class TermDepositAccount
    extends Model<AccountAttributes, AccountCreationAttributes>
    implements AccountAttributes
  {
    public startDate!: string;
    public endDate!: string;
    public percentageIncrease!: number;
    public id!: number;

    public amountDeposited!: number;
    public clientId!: number;
  
    // Declare association mixins (for relationships)
    public addTransfer!: HasManyAddAssociationMixin<Transfer, number>;
  
    // Timestamps
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
      endDate: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0.0,
      },
    startDate: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0.0,
      },
      percentageIncrease: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0.0,
      },
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Clients', // Assuming there's a Client model
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Account',
      tableName: 'accounts',
      timestamps: true,
    }
  );
  