


export interface  CheckingAccount  {
    id: number;
    balance: number;
    accountNumber: number;
}

export type EditCheckingAccount = Omit<CheckingAccount,|'id'>
export type CreateCheckingAccount =  Omit<CheckingAccount,'id'|'accountNumber'>