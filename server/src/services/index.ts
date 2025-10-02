
import { sequelize } from '../models';
import { AccountHolderService } from './accountHolderService';

import { BankService } from './bankService';
import { CheckingAccountService } from './checkingAccountService';
import { FixedDepositService } from './fixedDepositService';
import { SecondPartyService } from './secondPartyService';
import { TransactionService } from './transactionService';
import { UserService } from './UserService';
// Initialize all services
export const bankService = new BankService();
export const secondPartyService = new SecondPartyService();
export const accountHolderService = new AccountHolderService();
export const checkingAccountService = new CheckingAccountService();
export const fixedDepositService = new FixedDepositService();
export const transactionService = new TransactionService();
export const userService = new UserService()

// Export all services
export {
  BankService,
  SecondPartyService,
  AccountHolderService,
  CheckingAccountService,
  FixedDepositService,
  TransactionService,
  sequelize
};