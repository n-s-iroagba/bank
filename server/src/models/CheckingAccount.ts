import {
  Model,
  DataTypes,
  Optional,
} from 'sequelize';
import { sequelize } from '../config/dbConfig';

interface CheckingAccountAttributes {
  id: number;
  balance: number;
  clientId: number; // Associate with Client
}

interface CheckingAccountCreationAttributes
  extends Optional<CheckingAccountAttributes, 'id'> {}

export class CheckingAccount extends Model<CheckingAccountAttributes, CheckingAccountCreationAttributes>
  implements CheckingAccountAttributes {
  public id!: number;
  public balance!: number;
  public clientId!: number; // Add clientId field

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CheckingAccount.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
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
    modelName: 'CheckingAccount',
    tableName: 'checking_accounts',
    timestamps: true,
  }
);
