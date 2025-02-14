// src/models/AccountHolder.ts
import { Model, DataTypes, ForeignKey } from 'sequelize';
import { sequelize } from '../config/dbConfig'; // Correctly import sequelize instance

import { CheckingAccount } from './CheckingAccount';
import { TermDepositAccount } from './TermDepositAccount';
import { SecondParty } from './SecondParty';
import { Admin } from './Admin';



type  TAccountHolder={
  id: number;
  firstName: string;
  surname: string;
  middlename?: string;
  username: string;
  password: string;
  adminId:ForeignKey<Admin['id']>
}
type CreationTAccountHolder = Omit<TAccountHolder,'id'>

export class AccountHolder extends Model<TAccountHolder,CreationTAccountHolder> {
  public id!: number;
  public firstName!: string;
  public surname!: string;
  public middlename?: string;
  public username!: string;
  public password!: string;
  public adminId!:number
  public checkingAccount!: CheckingAccount;
  public termDepositAccount!: TermDepositAccount;
}

AccountHolder.init(
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
    adminId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'admins',
        key: 'id',
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middlename: {
      type: DataTypes.STRING,
      allowNull: true,
    },
},
  {
    sequelize, // Ensure this is passed correctly
    tableName: 'accountHolders',
  }
);
AccountHolder.hasOne(CheckingAccount, {
  foreignKey: 'accountHolderId',
  as: 'checkingAccount',
});
CheckingAccount.belongsTo(AccountHolder, {
  foreignKey: 'accountHolderId',
  as: 'accountHolder',
});
AccountHolder.hasOne(TermDepositAccount, {
  foreignKey: 'accountHolderId',
  as: 'termDepositAccount',
});

TermDepositAccount.belongsTo(AccountHolder, {
  foreignKey: 'accountHolderId',
  as: 'accountHolder',
});


