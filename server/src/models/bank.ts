import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface BankAttributes {
  id: number;
  name: string;
  logo: string ;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BankCreationAttributes extends Optional<BankAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Bank extends Model<BankAttributes, BankCreationAttributes> implements BankAttributes {
  public id!: number;
  public name!: string;
  public logo!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Model initialization
  public static initialize(sequelize: Sequelize) {
    const Bank = this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        logo: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
      },
      {
        tableName: 'banks',
        sequelize,
      }
    );

    return Bank;
  }

  // Associations
  public static associate(models: any) {
    Bank.hasMany(models.SecondParty, {
      foreignKey: 'bankId',
      as: 'secondParties',
    });
  }
}

export default Bank;