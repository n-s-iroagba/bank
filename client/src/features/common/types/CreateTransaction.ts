
import { SecondParty } from "../../common/types/SecondParty";
import { TransactionType } from "./TransactionType";

export type CreateTransaction= {
    date: Date|null;
    description: string;
    secondParty:SecondParty;
    amount: number;
    transactionType:TransactionType
  }
  