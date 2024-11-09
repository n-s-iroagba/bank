
  
  // Dummy CreateTransaction object
  const dummyCreateTransaction:  {
    date: new Date(),
    description: "Payment for services",
    amount: 500.00,
    transactionType: TransactionType.DEBIT,
    origin: TransactionOrigin.ACC, // Optional field
    secondParty: dummySecondParty,
  };
  
  // Dummy CreateTransactionSystem object
  const dummyCreateTransactionSystem  = {
    numberOfTransfers: 5,
    transferStartDate: new Date('2024-01-01'),
    transferEndDate: new Date('2024-12-31'),
    highestTransfer: 10000,
    lowestTransfer: 100,
  };
  