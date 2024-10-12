// /types/ClientAccount.ts
export interface Transfer {
    id: number;
    transferDate: string;  
    amount: number;
    recipientName: string;
    recipientAccountNumber: string;
  }
  
  export interface ClientAccount {
    id: number;
    username: string;
    password: string;
    fixedDepositAmount: number;
    checkingAccountAmount: number;
    transfers: Transfer[];  
    transferStartDate:string
    transferEndDate:string 
  }
  
  export interface CreateClientAccount {
    username: string;
    password: string;
    fixedDepositAmount: number;
    checkingAccountAmount: number;
    numberOfTransfers: number;
    transferStartDate:string
    transferEndDate:string 
  }

  export interface EditClientAccount {
    id:number;
    username: string;
    password: string;
    fixedDepositAmount: number;
    checkingAccountAmount: number;
    transferStartDate:string
    transferEndDate:string  
  }