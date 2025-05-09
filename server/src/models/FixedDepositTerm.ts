
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';

class FixedDepositTerm extends Model {
  public id!: number;
  public durationMonths!: number;
  public yieldPercentage!: number;
  public adminId!: number;
}

FixedDepositTerm.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  durationMonths: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  yieldPercentage: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'fixed_deposit_terms'
});

export default FixedDepositTerm;
