import { CheckingAccount } from "../types/CheckingAccount";
import { Transaction } from "../types/Transaction";


// Mock transaction data
const mockTransactions: any = [
  {
    id: 1,
    date: new Date("2025-01-01"),
    description: "Grocery Store Purchase",
    amount: -50.75,
    transactionType: "Debit",
    origin: "POS",
    secondParty: {
      id: 1,
      name: "SuperMart",
      accountNumber: "987654321",
    },
  },
  {
    id: 2,
    date: new Date("2025-01-03"),
    description: "Salary Deposit",
    amount: 1500.0,
    transactionType: "Credit",
    origin: "DirectDeposit",
    secondParty: {
      id: 2,
      name: "Employer Inc.",
      accountNumber: "123456789",
    },
  },
  {
    id: 3,
    date: new Date("2025-01-05"),
    description: "Utility Bill Payment",
    amount: -120.0,
    transactionType: "Debit",
    origin: "OnlineBanking",
    secondParty: {
      id: 3,
      name: "Utility Provider",
      accountNumber: "567890123",
    },
  },
];

// Mock checking account data
const mockCheckingAccount: CheckingAccount = {
  id: 1,
  balance: 1329.25,
  accountNumber: "1234567890",
  transactions: mockTransactions,
};

export { mockCheckingAccount, mockTransactions };


const useCheckingAccount =(id:number)=>{
    return mockCheckingAccount
}
export default useCheckingAccount