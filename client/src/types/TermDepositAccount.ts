
export type TermDepositAccount = {
        id: number;
        amountDeposited: number;
        depositDate: Date;
        payoutDate: Date;
        interestRate: number;
        accountNumber: string;
        accountHolderIds:number[];
  
}
export type CreateTermDepositAccount = Omit<TermDepositAccount,'id'|'accountNumber'>
