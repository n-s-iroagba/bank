

export type CreateTermDepositAccount = {
  
        amountDeposited: number;
        depositDate: Date;
        payoutDate: Date;
        interestRate: number;

   
}

export type UpdateTermDepositAccount = CreateTermDepositAccount &{
        accountNumber:string
}