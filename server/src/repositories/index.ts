import { BankRepository } from './bankRepository';
import { SecondPartyRepository } from './secondPartyRepository';
import { AccountHolderRepository } from './accountHolderRepository';
import { CheckingAccountRepository } from './checkingAccountRepository';
import { FixedDepositRepository } from './fixedDepositRepository';
import { TransactionRepository } from './transactionRepository';
import UserRepository from './userRepository';

// Initialize all repositories
export const bankRepository = new BankRepository();
export const userRepository = new UserRepository()
export const secondPartyRepository = new SecondPartyRepository();
export const accountHolderRepository = new AccountHolderRepository();
export const checkingAccountRepository = new CheckingAccountRepository();
export const fixedDepositRepository = new FixedDepositRepository();
export const transactionRepository = new TransactionRepository();

// Export all repositories
export {
  BankRepository,
  SecondPartyRepository,
  AccountHolderRepository,
  CheckingAccountRepository,
  FixedDepositRepository,
  TransactionRepository,
};