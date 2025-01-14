import { DashboardAccountDetails } from "../types/DashboardAccountDetails";

export const useGetAccountDetails = (id:number):DashboardAccountDetails =>{
    return {
        accountName: "John Doe's Accounts", // Example account name
        termDepositAccount: {
          accountNumber: "TD123456789", // Example term deposit account number
          interestRate: 5.2, // Example interest rate
          amountDeposited: 10000, // Example deposited amount
        },
        checkingAccount: {
          accountNumber: "CA987654321", // Example checking account number
          balance: 1500, // Example available balance
        },
      };
      
}