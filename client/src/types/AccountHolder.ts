import { CheckingAccount, CreateCheckingAccount } from "./CheckingAccount";
import { CreateTermDepostAccount, TermDepositAccount } from "./TermDepositAccount";

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
    termDepositAccount: CreateTermDepostAccount;
}

export type AccountHolder = BaseAccountHolder & {
    id: number;
    checkingAccount: CheckingAccount;
    termDepositAccount: TermDepositAccount;
};

