import { CheckingAccount } from "../models/CheckingAccount";
import { Transaction } from "../models/Transaction";
import { UpdateCheckingAccount } from "../types/CheckingAccountTypes";
import { CreateTransaction, TransactionOrigin, TransactionType } from "../types/TransactionType";
export class CheckingAccountService {
    static async editCheckingBalanceWithNoTransaction(id: number, amount: number) {
      const checkingAccount = await CheckingAccount.findByPk(id);
      if (!checkingAccount) {
        throw new Error('Checking account not found');
      }
  
      checkingAccount.balance += amount;
      await checkingAccount.save();
    }
  
    static async editCheckingBalanceWithTransaction(id: number, data: CreateTransaction) {
      const checkingAccount = await CheckingAccount.findByPk(id);
      if (!checkingAccount) {
        throw new Error('Checking account not found');
      }
  
      if (data.transactionType === TransactionType.DEBIT && checkingAccount.balance < data.amount) {
        throw new Error('Insufficient balance');
      }
  
      data.transactionType === TransactionType.CREDIT
        ? (checkingAccount.balance += data.amount)
        : (checkingAccount.balance -= data.amount);
  
      await Transaction.create({
        accountId: checkingAccount.id,
        date: data.date,
        description: data.description,
        secondPartyId: data.secondPartyId,
        origin: TransactionOrigin.ADMIN,
        amount: data.amount,
        transactionType: data.transactionType,
      });
  
      await checkingAccount.save();
    }
  
    static async getCheckingAccount(id: number) {
      const checkingAccount = await CheckingAccount.findOne({where:{
        accountHolderId:id
      }});
      console.log('checkingAccount', checkingAccount)
      return checkingAccount;
    }
  
    static async debitAccount(id: number, amount: number) {
      const checkingAccount = await CheckingAccount.findByPk(id);
      if (!checkingAccount) {
        throw new Error('Checking account not found');
      }
  
      if (checkingAccount.balance < amount) {
        throw new Error('Insufficient balance');
      }
  
      checkingAccount.balance -= amount;
      await checkingAccount.save();
    }
  
    static async updateCheckingAccount(id: number, data: UpdateCheckingAccount) {
      const checkingAccount = await CheckingAccount.findByPk(id);
      if (!checkingAccount) return null;
  
      checkingAccount.balance = data.balance;
      checkingAccount.accountNumber = data.accountNumber;
      await checkingAccount.save();
  
      return checkingAccount;
    }
  }
  
  