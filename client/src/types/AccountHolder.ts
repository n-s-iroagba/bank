import { CheckingAccount, CreateCheckingAccount } from "./CheckingAccount";
import { CreateTermDepositAccount, TermDepositAccount } from "./TermDepositAccount";
import { CreateTransactionSystem } from "./Transaction";

export type BaseAccountHolder = {
    id: number;
    firstname: string;
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

export type AccountHolder = BaseAccountHolder & {
    id: number;
    checkingAccount: CheckingAccount;
    termDepositAccount: TermDepositAccount;
};

export type EditAccountHolder = Omit<BaseAccountHolder, 'id'>