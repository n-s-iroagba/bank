import { CheckingAccount } from "./CheckingAccount";
import { TermDepositAccount } from "./TermDepositAccount";

export type DashboardAccountDetails = {
    accountName: string;
    termDepositAccount:Partial <TermDepositAccount>;
    checkingAccount: Partial <CheckingAccount>;
  };
  