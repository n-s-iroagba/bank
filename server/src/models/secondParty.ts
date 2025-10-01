import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface SecondPartyAttributes {
  id: number;
  name: string;
  details: string;
  bankId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SecondPartyCreationAttributes extends Optional<SecondPartyAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class SecondParty extends Model<SecondPartyAttributes, SecondPartyCreationAttributes> implements SecondPartyAttributes {
  public id!: number;
  public name!: string;
  public details!: string;
  public bankId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Model initialization
  public static initialize(sequelize: Sequelize) {
    const SecondParty = this.init(
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
        details: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        bankId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'banks',
            key: 'id',
          },
        },
      },
      {
        tableName: 'second_parties',
        sequelize,
      }
    );

    return SecondParty;
  }

  // Associations
  public static associate(models: any) {
    SecondParty.belongsTo(models.Bank, {
      foreignKey: 'bankId',
      as: 'bank',
    });

    SecondParty.hasMany(models.Transaction, {
      foreignKey: 'secondPartyId',
      as: 'transactions',
    });
  }
}

export default SecondParty;