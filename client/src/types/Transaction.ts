
import { SecondParty } from "./SecondParty";

export enum TransactionOrigin {
  ADMIN = 'Admin',
  CLIENT = 'Client',
  SYSTEM= 'System'
}

export enum TransactionType {
  DEBIT = 'Debit',
  CREDIT = 'Credit'
}


export type Transaction = {
  id: number;
  date: Date;
  description: string;
  amount: number;
  transactionType: TransactionType;
  origin?: TransactionOrigin;  // Adding the optional origin field
  secondParty: SecondParty
};

export type CreateTransaction = Omit<Transaction, 'id'>
