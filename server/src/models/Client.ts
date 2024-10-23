// /src/models/Client.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig'; // Adjust import based on your project structure

class Client extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public middleName!: string|null;
  public firstName!: number;
  public lastName!: number;
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Client',
  }
);

export default Client;
