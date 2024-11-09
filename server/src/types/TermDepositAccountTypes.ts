

export type CreateTermDepositAccount = {
  
        amountDeposited: number;
        startDate: Date;
        durationInDays: number;
        interestRate: number;

   
}

export type EditTermDepositAccount = CreateTermDepositAccount &{
        accountNumber:number
}