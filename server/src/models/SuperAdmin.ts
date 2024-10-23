import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig';
import { Admin } from './Admin';  

export class SuperAdmin extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public isVerified!: boolean;
  public resetCode?: number;
  public verificationCode!: string | null;
  public admins!: Admin[];  
}

SuperAdmin.init(
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
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    resetCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'super_admins',  
  }
);


SuperAdmin.hasMany(Admin, {
  foreignKey: 'superAdminId',
  as: 'admins',  
});

Admin.belongsTo(SuperAdmin, {
  foreignKey: 'superAdminId',
  as: 'superAdmin',
});
