import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig'; 
import { AccountHolder } from './AccountHolder';


export class Admin extends Model {
  public id!: number;
  public name!: string;
  public username!: string;
  public password!: string;
  public superAdminId!: number; 
}

Admin.init(
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    superAdminId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'super_admins',  
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'admins', 
  }
);
