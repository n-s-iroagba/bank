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
}
export type CreateTermDepositAccount = Omit<TermDepositAccount,'id'|'accountNumber'|'accountHolderId'|'accountHolder'>
export type UpdateTermDepositAccount = Omit<TermDepositAccount,'id'>