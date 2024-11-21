


export interface  CheckingAccount  {
    id: number;
    balance: number;
    accountNumber: string;
}

export type UpdateCheckingAccount = Omit<CheckingAccount,|'id'>
export type CreateCheckingAccount =  Omit<CheckingAccount,'id'|'accountNumber'>