import { Bank } from "../../common/types/Bank";

export type CreateSecondParty ={
 
    firstname: string;
    surname:string;
    accountNumber:string;
    bank:Bank
    canRecieve:boolean;
    canSend:boolean;
}