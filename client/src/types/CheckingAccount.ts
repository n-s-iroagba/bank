import { Transaction } from "./Transaction";


export type CheckingAccount = {
    id: number;
    balance: number;
    accountNumber: number;
    transactions?: Transaction[];
}

export type EditCheckingAccount = {
    id:number;
    numberOfTransfers: number;
    transferStartDate: Date;
    transferEndDate: Date;
    balance:number;
    highestTransfer: number;
    lowestTransfer: number
}
export type CreateCheckingAccount =  Omit<EditCheckingAccount,'id'>