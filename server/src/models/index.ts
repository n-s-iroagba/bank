
import sequelize from '../config/database';
import User from './user';
import Bank from './bank';
import SecondParty from './secondParty';
import AccountHolder from './accountHolder';
import CheckingAccount from './checkingAccount';
import FixedTermDeposit from './fixedTermDeposit';
import Transaction from './transaction';

// Initialize models
const models = {
  User: User.initialize(sequelize),
  Bank: Bank.initialize(sequelize),
  SecondParty: SecondParty.initialize(sequelize),
  AccountHolder: AccountHolder.initialize(sequelize),
  CheckingAccount: CheckingAccount.initialize(sequelize),
  FixedTermDeposit: FixedTermDeposit.initialize(sequelize),
  Transaction: Transaction.initialize(sequelize),
};

// ---------------- Associations ---------------- //

// AccountHolder → FixedTermDeposit (1:N)
models.AccountHolder.hasMany(models.FixedTermDeposit, {
  foreignKey: 'accountHolderId',
  as: 'fixedTermDeposits',
})
models.FixedTermDeposit.belongsTo(models.AccountHolder, {
  foreignKey: 'accountHolderId',
  as: 'accountHolder',
})

// AccountHolder → CheckingAccount (1:N)
models.AccountHolder.hasMany(models.CheckingAccount, {
  foreignKey: 'accountHolderId',
  as: 'checkingAccounts',
})
models.CheckingAccount.belongsTo(models.AccountHolder, {
  foreignKey: 'accountHolderId',
  as: 'accountHolder',
})

// CheckingAccount → Transaction (1:N)
models.CheckingAccount.hasMany(models.Transaction, {
  foreignKey: 'checkingAccountId',
  as: 'transactions',
})
models.Transaction.belongsTo(models.CheckingAccount, {
  foreignKey: 'checkingAccountId',
  as: 'checkingAccount',
})

// Transaction → SecondParty (1:1)
models.Transaction.belongsTo(models.SecondParty, {
  foreignKey: 'secondPartyId',
  as: 'secondParty',
})
models.SecondParty.hasOne(models.Transaction, {
  foreignKey: 'secondPartyId',
  as: 'transaction',
})

// SecondParty → Bank (1:1)
models.SecondParty.belongsTo(models.Bank, {
  foreignKey: 'bankId',
  as: 'bank',
})
models.Bank.hasOne(models.SecondParty, {
  foreignKey: 'bankId',
  as: 'secondParty',
})

export default models

export { sequelize };


