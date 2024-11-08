export type TermDepositAccount = {
        id: number;
        amountDeposited: number;
        startDate: Date;
        durationInDays: number;
        interestRate: number;
        accountHolderId: number;
        accountNumber: number;
        interest: number;
}
export type CreateTermDepostAccount = Omit<TermDepositAccount,'id'|'interest'|'accountNumber'|'accountHolderId'>