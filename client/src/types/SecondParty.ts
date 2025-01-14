import { Bank } from "./Bank";

export type SecondParty = {
    id: number;
    firstName: string;
    surname: string;
    accountNumber: string;
    bank: Bank;
    canReceive: boolean; 
    canSend: boolean;
};

export type CreateSecondParty = {
 
    firstName: string;
    surname: string;
    accountNumber: string;
    bank: Bank;
    canReceive: boolean; 
};
export type UpdateSecondParty = {
    firstName: string;
    surname: string;
    accountNumber: string;
    bank: Bank;
    canReceive: boolean; 
    canSend: boolean;
}