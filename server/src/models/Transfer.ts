import {
    Model,
    DataTypes,
    Optional,
    BelongsToCreateAssociationMixin,
  } from 'sequelize';
  import {sequelize }from '../config/dbConfig';
import { CheckingAccount } from './CheckingAccount';

  
  // Interface for the attributes of the Transfer
  interface TransferAttributes {
    id: number;
    amount: number;
    transferDate: Date;
    accountId: number; // Foreign key to Account
  }
  
  // Optional fields when creating a new Transfer instance
  interface TransferCreationAttributes
    extends Optional<TransferAttributes, 'id'> {}
  
  // The Transfer model itself
  export class Transfer
    extends Model<TransferAttributes, TransferCreationAttributes>
    implements TransferAttributes
  {
    public id!: number;
    public amount!: number;
    public transferDate!: Date;
    public accountId!: number;
  
    // Association mixin for creating related entities
    public createAccount!: BelongsToCreateAssociationMixin<CheckingAccount>;
  
    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  Transfer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      transferDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Transfer',
      tableName: 'transfers',
      timestamps: true,
    }
  );
  