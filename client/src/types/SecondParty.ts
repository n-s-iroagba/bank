import { Bank } from "./Bank";

export type SecondParty = {
    id: number;
    firstname: string;
    surname: string;
    accountNumber: string;
    bank: Bank;
    canReceive: boolean; 
    canSend: boolean;
};

export type CreateSecondParty = {
 
    firstname: string;
    surname: string;
    accountNumber: string;
    bank: Bank|null;
    canReceive: boolean; 
    canSend: boolean;
};