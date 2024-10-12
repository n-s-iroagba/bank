// /src/models/Client.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig'; // Adjust import based on your project structure

class Client extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public fixedDepositAmount!: number;
  public checkingAccountAmount!: number;
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fixedDepositAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    checkingAccountAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Client',
  }
);

export default Client;
