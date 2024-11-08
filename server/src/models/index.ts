import { AccountHolder } from "./AccountHolder";
import { Admin } from "./Admin";
import Bank from "./Bank";
import { CheckingAccount } from "./CheckingAccount";
import { SecondParty } from "./SecondParty";
import { SuperAdmin } from "./SuperAdmin";
import { TermDepositAccount } from "./TermDepositAccount";
import { Transaction } from "./Transaction";

AccountHolder.hasOne(CheckingAccount, {
    foreignKey: 'accountHolderId',
    as: 'checkingAccount',
  });
  CheckingAccount.belongsTo(AccountHolder, {
    foreignKey: 'accountHolderId',
    as: 'accountHolder',
  });
  
SecondParty.belongsTo(Bank, {
    foreignKey: 'bankId',
    as: 'bank',
  });
  Bank.hasMany(
    SecondParty,
    {
      foreignKey: 'bankId',
      as:'secondParties',
    }
  )
  SecondParty.hasMany(Transaction, {
    foreignKey:'secondPartyId',
    as: 'transactions',
  });
  
  
  Transaction.belongsTo(SecondParty, {
    foreignKey: 'secondPartyId',
    as: 'secondParty',
  });

  Admin.hasMany(
    AccountHolder,{
      foreignKey: 'adminId',
      as: 'accountHolders',
    }
  )
  AccountHolder.belongsTo(
    Admin, {
      foreignKey: 'adminId',
      as: 'admin',
    }
  )



CheckingAccount.hasMany(Transaction, {
    foreignKey: 'accountId',
    as: 'transactions',
  });
  
  Transaction.belongsTo(CheckingAccount, {
    foreignKey: 'accountId',
    as: 'account',
  });

  SuperAdmin.hasMany(Admin, {
    foreignKey: 'superAdminId',
    as: 'admins',  
  });
  
  Admin.belongsTo(SuperAdmin, {
    foreignKey: 'superAdminId',
    as: 'superAdmin',
  });

  AccountHolder.hasOne(TermDepositAccount, {
    foreignKey: 'accountHolderId',
    as: 'termDepositAccount',
  });
  
  TermDepositAccount.belongsTo(AccountHolder, {
    foreignKey: 'accountHolderId',
    as: 'accountHolder',
  });
  