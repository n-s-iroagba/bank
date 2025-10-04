// src/types/apiResponse.ts

import { PaginatedResponse, Bank, BankWithSecondParties, ExcelUploadResponse, SecondPartyWithBank, SecondParty, AccountHolderWithDetails, AccountHolder, CheckingAccountWithDetails, CheckingAccount, FixedTermDepositWithDetails, FixedTermDeposit, TransactionWithDetails, Transaction, AuthResponse, AccountHolderDashboard, AdminDashboard } from ".";

// ✅ Base generic response wrapper (for endpoints that use it)
export interface ApiResponse<T> {
  success: boolean;           
  message: string;            
  data: T;                    
  pagination?: {              
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  errors?: Record<string, any>; 
}

// ✅ Bank endpoints
export type BanksResponse = PaginatedResponse<Bank>;
export type BankResponse = BankWithSecondParties;
export type CreateBankResponse = Bank;
export type UpdateBankResponse = Bank;
export type BulkCreateBanksResponse = Bank[];
export type BulkCreateBanksExcelResponse = ExcelUploadResponse;

// ✅ Second party endpoints
export type SecondPartiesResponse = PaginatedResponse<SecondPartyWithBank>;
export type SecondPartyResponse = SecondPartyWithBank;
export type CreateSecondPartyResponse = SecondParty;
export type UpdateSecondPartyResponse = SecondParty;
export type BulkCreateSecondPartiesResponse = SecondParty[];
export type BulkCreateSecondPartiesExcelResponse = ExcelUploadResponse;

// ✅ Account holder endpoints
export type AccountHoldersResponse = PaginatedResponse<AccountHolderWithDetails>;
export type AccountHolderResponse = AccountHolderWithDetails;
export type CreateAccountHolderResponse = AccountHolder;
export type UpdateAccountHolderResponse = AccountHolder;

// ✅ Checking account endpoints
export type CheckingAccountsResponse = PaginatedResponse<CheckingAccountWithDetails>;
export type CheckingAccountResponse = CheckingAccountWithDetails;
export type CreateCheckingAccountResponse = CheckingAccount;
export type UpdateCheckingAccountResponse = CheckingAccount;

// ✅ Fixed deposits
export type FixedDepositsResponse = PaginatedResponse<FixedTermDepositWithDetails>;
export type FixedDepositResponse = FixedTermDepositWithDetails;
export type CreateFixedDepositResponse = FixedTermDeposit;
export type UpdateFixedDepositResponse = FixedTermDeposit;
export type MatureDepositsResponse = FixedTermDepositWithDetails[];

// ✅ Transactions
export type TransactionsResponse = PaginatedResponse<TransactionWithDetails>;
export type TransactionResponse = TransactionWithDetails;
export type CreateTransactionResponse = Transaction;
export type UpdateTransactionResponse = Transaction;
export type AccountStatementResponse = TransactionWithDetails[];

// ✅ Auth
export type LoginResponse = AuthResponse;
export type RegisterResponse = AuthResponse;

// ✅ Dashboards
export type AccountHolderDashboardResponse = AccountHolderDashboard;
export type AdminDashboardResponse = AdminDashboard;
