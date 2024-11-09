// models/SecondParty.ts
import { Model, DataTypes, BelongsTo } from 'sequelize';
import { sequelize } from '../config/dbConfig';
import Bank  from './Bank';
import { Transaction } from './Transaction';
type TSecondParty={
  id:number;
  firstname: string;
  surname: string;
  accountNumber: number;
  bankId: number;
  canSend:boolean;
  canReceive: boolean
  accountHolderId: number;

}
type CreationTSecondParty = Omit<TSecondParty,'id'>
export class SecondParty extends Model<TSecondParty,CreationTSecondParty> {
  public id!: number;
  public firstname!: string;
  public surname!: string;
  public accountNumber!: number;
  public bankId!: number;
  public bank!: Bank;
  public canSend!:boolean;
  public canReceive!: boolean
  public accountHolderId!: number;
}

SecondParty.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'banks', key: 'id' },
    },
    accountHolderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'accountHolders', key: 'id' },
    },
    accountNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    canSend: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    canReceive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  },
  {
    sequelize,
    tableName: 'second_parties',
  }
);
SecondParty.hasMany(Transaction, {
  foreignKey:'secondPartyId',
  as: 'transactions',
});


Transaction.belongsTo(SecondParty, {
  foreignKey: 'secondPartyId',
  as: 'secondParty',
});



