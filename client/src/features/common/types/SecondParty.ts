import { Bank } from "./Bank";

export type SecondParty ={
    id: number;
    firstname: string;
    surname:string;
    accountNumber:string;
    bank:Bank
    canRecieve:boolean;
    canSend:boolean;
}