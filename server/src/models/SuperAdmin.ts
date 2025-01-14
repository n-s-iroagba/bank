import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig';
import { Admin } from './Admin';  
type TSuperAdmin = {
   id: number;
 username:string;
 firstName:string;
 surname:string;
   email: string;
   password: string;
   isVerified: boolean;
   resetCode?: string;
   adminIdentification:number
   verificationCode: number|null ;
}
type CreationTSuperAdmin = Omit<TSuperAdmin,'id'|'adminIdentification'|'isVerified'>
export class SuperAdmin extends Model<TSuperAdmin,CreationTSuperAdmin> {
  public id!: number;
  public username!: string;

  public firstName!:string;
  public surname!:string;
  public email!: string;
  public password!: string;
  public isVerified!: boolean;
  public resetCode?: string;
  public adminIdentification?:number
  public verificationCode!: number|null ;
  public admins!: Admin[];  
}

SuperAdmin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
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
      allowNull: false,
      defaultValue: false,
    },
    verificationCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    adminIdentification: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    resetCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username:  {
      type: DataTypes.STRING,
      allowNull: false,
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