import { Bank } from "./Bank";

export type SecondParty = {
    id: number;
    firstName: string;
    surname: string;
    accountNumber: string;
    bank: Bank;
};

export type CreateSecondParty = {
    firstName: string;
    surname: string;
    accountNumber: string;
    bank: Bank;
   
};
export type UpdateSecondParty = {
    firstName: string;
    surname: string;
    accountNumber: string;
    bank: Bank;
}

export type CreateBulkSecondParty ={
    firstName: string;
    surname: string;
}