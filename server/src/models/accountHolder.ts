import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface AccountHolderAttributes {
  id: number;
  userId: number;
  email:string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  address: string;
  phoneNumber: string;
  ssn: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AccountHolderCreationAttributes extends Optional<AccountHolderAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class AccountHolder extends Model<AccountHolderAttributes, AccountHolderCreationAttributes> implements AccountHolderAttributes {
  public id!: number;
  public userId!: number;
  public firstName!: string;
  public email!:string
  public username!:string
  public lastName!: string;
  public dateOfBirth!: Date;
  public address!: string;
  public phoneNumber!: string;
  public ssn!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Model initialization
  public static initialize(sequelize: Sequelize) {
    const AccountHolder = this.init(
      {
          id: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true,
          },
          userId: {
              type: DataTypes.INTEGER,
              allowNull: false,
              unique: true,
              references: {
                  model: 'users',
                  key: 'id',
              },
          },
          username: {
              type: DataTypes.STRING,
              allowNull: false,
              validate: {
                  notEmpty: true,
              },
          },
          firstName: {
              type: DataTypes.STRING,
              allowNull: false,
              validate: {
                  notEmpty: true,
              },
          },
          lastName: {
              type: DataTypes.STRING,
              allowNull: false,
              validate: {
                  notEmpty: true,
              },
          },
          dateOfBirth: {
              type: DataTypes.DATE,
              allowNull: false,
          },
          address: {
              type: DataTypes.TEXT,
              allowNull: false,
              validate: {
                  notEmpty: true,
              },
          },
          phoneNumber: {
              type: DataTypes.STRING,
              allowNull: false,
              validate: {
                  notEmpty: true,
              },
          },
          ssn: {
              type: DataTypes.STRING,
              allowNull: false,
              validate: {
                  notEmpty: true,
                  len: [9, 9],
              },
          },
          email: {
            type:DataTypes.STRING,
            allowNull:false
          }
      },
      {
        tableName: 'account_holders',
        sequelize,
      }
    );

    return AccountHolder;
  }

  // Associations
  public static associate(models: any) {
    AccountHolder.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    AccountHolder.hasMany(models.CheckingAccount, {
      foreignKey: 'accountHolderId',
      as: 'checkingAccounts',
    });

    AccountHolder.hasMany(models.FixedTermDeposit, {
      foreignKey: 'accountHolderId',
      as: 'fixedTermDeposits',
    });
  }
}

export default AccountHolder;