import { DataTypes, Model, Optional } from 'sequelize';
import {sequelize} from '../config/dbConfig'; // adjust this import based on your setup

interface BankAttributes {
  id: number;
  name: string;
  logo: string;
}

interface BankCreationAttributes extends Optional<BankAttributes, 'id'> {}

class Bank extends Model<BankAttributes, BankCreationAttributes> implements BankAttributes {
  public id!: number;
  public name!: string;
  public logo!: string; // path to the logo file

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Bank.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Bank',
    tableName: 'banks',
  }
);

export default Bank;
