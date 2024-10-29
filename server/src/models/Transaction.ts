import {
  Model,
  DataTypes,
  Optional,
  BelongsToCreateAssociationMixin,
  Association,
} from 'sequelize';
import { sequelize } from '../config/dbConfig';
import { CheckingAccount } from './CheckingAccount';
import { SecondParty } from './SecondParty';

// Interface for the attributes of the Transaction
interface TransactionAttributes {
  id: number;
  amount: number;
  date: Date;
  transferDate: Date;
  accountId: number; 
  description: string;
  secondPartyId: number; 
}


interface TransferCreationAttributes extends Optional<TransactionAttributes, 'id'> {}


class Transaction
  extends Model<TransactionAttributes, TransferCreationAttributes>
  implements TransactionAttributes {
  public id!: number;
  public amount!: number;
  public date!: Date;
  public transferDate!: Date;
  public accountId!: number;
  public description!: string;
  public secondPartyId!: number;


  public createCheckingAccount!: BelongsToCreateAssociationMixin<CheckingAccount>;
  public createSecondParty!: BelongsToCreateAssociationMixin<SecondParty>;


  public static associations: {
    checkingAccount: Association<Transaction, CheckingAccount>;
    secondParty: Association<Transaction, SecondParty>;
  };
}


Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    transferDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CheckingAccount,
        key: 'id',
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    secondPartyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SecondParty,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'transactions',
    timestamps: false,
  }
);


Transaction.belongsTo(CheckingAccount, { foreignKey: 'accountId', as: 'checkingAccount' });
Transaction.belongsTo(SecondParty, { foreignKey: 'secondPartyId', as: 'secondParty' });

export { Transaction };
