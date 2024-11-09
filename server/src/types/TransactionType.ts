

export enum TransactionOrigin {
  ADMIN = 'Admin',
  CLIENT = 'Client',
  SYSTEM= 'System'
}

export enum TransactionType {
  DEBIT = 'Debit',
  CREDIT = 'Credit'
}


export type CreateTransaction = {

  date: Date;
  description: string;
  amount: number;
  transactionType: TransactionType;
  origin?: TransactionOrigin;  // Adding the optional origin field
  secondPartyId: number
};




export type CreateTransactionSystem = {
  numberOfTransfers: number;
  transferStartDate: Date;
  transferEndDate: Date;
  highestTransfer: number;
  lowestTransfer: number
}




