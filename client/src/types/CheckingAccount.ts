import { Transaction } from "./Transaction";


export type CheckingAccount = {
    id: number;
    balance: number;
    accountNumber: string;
    transactions?: Transaction[];
}

export type UpdateCheckingAccount = Omit<CheckingAccount,'transactions'|'id'>
export type CreateCheckingAccount =  Omit<CheckingAccount,'id'|'transactions'|'accountNumber'>