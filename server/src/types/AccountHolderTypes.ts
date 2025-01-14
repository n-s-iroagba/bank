import { CreateCheckingAccount } from "./CheckingAccountTypes";
import { CreateTermDepositAccount } from "./TermDepositAccountTypes";
import { CreateTransactionSystem } from "./TransactionType";

export interface BaseAccountHolder  {
    id: number;
    firstName: string;
    surname: string;
    middlename?: string;
    username:string;
    password: string;

};

export type CreateAccountHolder = Omit<BaseAccountHolder,'id'> & {
    checkingAccount: CreateCheckingAccount;
    termDepositAccount: CreateTermDepositAccount;
    transaction:CreateTransactionSystem
}


export type UpdateAccountHolder = Omit<BaseAccountHolder,'id'>;
