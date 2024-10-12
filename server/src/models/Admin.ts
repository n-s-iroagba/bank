
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig'; 
export class Admin extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public isVerified!: boolean;
  public verificationCode!: string;
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificationCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'admins', // Changed table name to reflect Admin
  }
);

