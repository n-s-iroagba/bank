import {
  ApiResponse,
  PaginatedResponse,
  Bank,
  BankWithSecondParties,
  SecondParty,
  SecondPartyWithBank,
  AccountHolder,
  AccountHolderWithDetails,
  CheckingAccount,
  CheckingAccountWithDetails,
  FixedTermDeposit,
  FixedTermDepositWithDetails,
  Transaction,
  TransactionWithDetails,
  ExcelUploadResponse,
  AuthResponse,
  AccountHolderDashboard,
  AdminDashboard
} from './index';

// Define specific API response types for each endpoint
export type BanksResponse = ApiResponse<PaginatedResponse<Bank>>;
export type BankResponse = ApiResponse<BankWithSecondParties>;
export type CreateBankResponse = ApiResponse<Bank>;
export type UpdateBankResponse = ApiResponse<Bank>;
export type BulkCreateBanksResponse = ApiResponse<Bank[]>;
export type BulkCreateBanksExcelResponse = ApiResponse<ExcelUploadResponse>;

export type SecondPartiesResponse = ApiResponse<PaginatedResponse<SecondPartyWithBank>>;
export type SecondPartyResponse = ApiResponse<SecondPartyWithBank>;
export type CreateSecondPartyResponse = ApiResponse<SecondParty>;
export type UpdateSecondPartyResponse = ApiResponse<SecondParty>;
export type BulkCreateSecondPartiesResponse = ApiResponse<SecondParty[]>;
export type BulkCreateSecondPartiesExcelResponse = ApiResponse<ExcelUploadResponse>;

export type AccountHoldersResponse = ApiResponse<PaginatedResponse<AccountHolderWithDetails>>;
export type AccountHolderResponse = ApiResponse<AccountHolderWithDetails>;
export type CreateAccountHolderResponse = ApiResponse<AccountHolder>;
export type UpdateAccountHolderResponse = ApiResponse<AccountHolder>;

export type CheckingAccountsResponse = ApiResponse<PaginatedResponse<CheckingAccountWithDetails>>;
export type CheckingAccountResponse = ApiResponse<CheckingAccountWithDetails>;
export type CreateCheckingAccountResponse = ApiResponse<CheckingAccount>;
export type UpdateCheckingAccountResponse = ApiResponse<CheckingAccount>;

export type FixedDepositsResponse = ApiResponse<PaginatedResponse<FixedTermDepositWithDetails>>;
export type FixedDepositResponse = ApiResponse<FixedTermDepositWithDetails>;
export type CreateFixedDepositResponse = ApiResponse<FixedTermDeposit>;
export type UpdateFixedDepositResponse = ApiResponse<FixedTermDeposit>;
export type MatureDepositsResponse = ApiResponse<FixedTermDepositWithDetails[]>;

export type TransactionsResponse = ApiResponse<PaginatedResponse<TransactionWithDetails>>;
export type TransactionResponse = ApiResponse<TransactionWithDetails>;
export type CreateTransactionResponse = ApiResponse<Transaction>;
export type UpdateTransactionResponse = ApiResponse<Transaction>;
export type AccountStatementResponse = ApiResponse<TransactionWithDetails[]>;

export type LoginResponse = ApiResponse<AuthResponse>;
export type RegisterResponse = ApiResponse<AuthResponse>;

export type AccountHolderDashboardResponse = ApiResponse<AccountHolderDashboard>;
export type AdminDashboardResponse = ApiResponse<AdminDashboard>;