// /src/models/Transfer.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig'; // Adjust import based on your project structure

class Transfer extends Model {
  public id!: number;
  public clientId!: number;
  public amount!: number;
  public date!: Date;
  public name!: string;
  public accountNumber!: string;
}

Transfer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Transfer',
  }
);

export default Transfer;
