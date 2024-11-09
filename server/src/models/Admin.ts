import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig'; 
import { AccountHolder } from './AccountHolder';
import { SuperAdmin } from './SuperAdmin';

type TAdmin ={
  id: number;
  username: string;
  email:string;
  password: string;
  superAdminId: number;
}
type CreationTAdmin = Omit<TAdmin,'id'>
export class Admin extends Model<TAdmin,CreationTAdmin> {
  public id!: number;

  public username!: string;
  public password!: string;
  public superAdminId!: number
  public SuperAdmin!:SuperAdmin; 
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
    email:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'admins',
  }
);

Admin.hasMany(AccountHolder, {
  foreignKey: 'adminId',
  as: 'accountHolders',  // Use this alias consistently in queries
});

AccountHolder.belongsTo(Admin, {
  foreignKey: 'adminId',
  as: 'admin',  // Ensure this alias is consistent as well
});
