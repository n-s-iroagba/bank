import { CheckingAccount, CreateCheckingAccount } from "./CheckingAccount";
import { SecondParty } from "./SecondParty";
import { CreateTermDepositAccount, TermDepositAccount } from "./TermDepositAccount";
import { CreateTransactionSystem } from "./Transaction";

export type BaseAccountHolder = {
    id: number;
    firstName: string;
    surname: string;
    middlename?: string;
    username:string;
    password: string;

};



export type AccountHolder = BaseAccountHolder & {
    id: number;
    secondParties:SecondParty[]
    checkingAccount: CheckingAccount;
    termDepositAccount: TermDepositAccount;
};

export type UpdateAccountHolder = Omit<BaseAccountHolder, 'id'>

export type CreateAccountHolder = Omit<BaseAccountHolder,'id'> & {
   
    checkingAccount: CreateCheckingAccount;
    termDepositAccount: CreateTermDepositAccount;
    transaction:CreateTransactionSystem
}


