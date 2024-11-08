import { AccountHolder } from "./AccountHolder";

export type TermDepositAccount = {
        id: number;
        amountDeposited: number;
        startDate: Date;
        durationInDays: number;
        interestRate: number;
        accountHolderId: number;
        accountHolder:AccountHolder
        accountNumber: number;
        interest: number;
}
export type CreateTermDepositAccount = Omit<TermDepositAccount,'id'|'accountNumber'|'accountHolderId'|'accountHolder'>
export type EditTermDepositAccount = Omit<TermDepositAccount,'id'>