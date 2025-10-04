// Base types for all entities
export interface User {
  id: number;
  email: string;
  role: 'admin' | 'account_holder';
  isActive: boolean;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Bank {
  id: number;
  name: string;
  logo: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SecondParty {
  id: number;
  name: string;
  details: string;
  bankId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AccountHolder {
  id: number;
  userId: number;
  username:string
  firstName: string;
  password:string
  lastName: string;
  address: string;
  email:string
  phoneNumber: string;
  ssn: string;
  dateOfBirth:string
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CheckingAccount {
  id: number;
  accountNumber: string;
  balance: number;
  accountHolderId: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FixedTermDeposit {
  id: number;
  accountNumber: string;
  balance: number;
  term: number;
  interestRate: number;
  maturityDate: Date;
  accountHolderId: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Transaction {
  id: number;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  checkingAccountId: number;
  secondPartyId: number;
  balanceAfter: number;
  date:Date
  createdAt: Date;
  updatedAt: Date;
}

// Types with joined data (for API responses that include relationships)
export interface BankWithSecondParties extends Bank {
  secondParties: SecondParty[];
}

export interface SecondPartyWithBank extends SecondParty {
  bank: Bank;
}

export interface AccountHolderWithUser extends AccountHolder {
  user: User;
}

export interface AccountHolderWithDetails extends AccountHolder {
  user: Pick<User, 'email' | 'role' | 'isActive' | 'lastLogin'>;
  checkingAccounts: CheckingAccount[];
  fixedTermDeposits: FixedTermDeposit[];
}

export interface CheckingAccountWithDetails extends CheckingAccount {
  accountHolder: AccountHolderWithUser;
  transactions: Transaction[];
}

export interface FixedTermDepositWithDetails extends FixedTermDeposit {
  accountHolder: AccountHolderWithUser;
}

export interface TransactionWithDetails extends Transaction {
  checkingAccount: {
    accountNumber: string;
    accountHolder: {
      firstName: string;
      lastName: string;
      user: {
        email: string;
      };
    };
  };
  secondParty: {
    name: string;
    details: string;
    bank: {
      name: string;
      logo: string;
    };
  };
}

// Request types for creating/updating entities
export interface CreateBankRequest {
  name: string;
  logo: string;
}

export interface UpdateBankRequest {
  name?: string;
  logo?: string;
}

export interface CreateSecondPartyRequest {
  name: string;
  details: string;
  bankId: number;
}

export interface UpdateSecondPartyRequest {
  name?: string;
  details?: string;
  bankId?: number;
}

export interface CreateAccountHolderRequest {
  username:string
  email:string
  password:string
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  ssn: string;
  dateOfBirth:string
}

export interface UpdateAccountHolderRequest {
  username:string
  email:string
  password:string
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  ssn: string;
  dateOfBirth:string
}

export interface CreateCheckingAccountRequest {
  accountHolderId: number;
  balance?: number;
}

export interface UpdateCheckingAccountRequest {
  accountHolderId?: number;
  balance?: number;
  isActive?: boolean;
}

export interface CreateFixedDepositRequest {
  accountHolderId: number;
  balance?: number;
  term: number;
  interestRate: number;
}

export interface UpdateFixedDepositRequest {
  accountHolderId?: number;
  balance?: number;
  term?: number;
  interestRate?: number;
  isActive?: boolean;
}

export interface CreateTransactionRequest {
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  checkingAccountId: number;
  secondPartyId: number;
}

export interface UpdateTransactionRequest {
  type?: 'debit' | 'credit';
  amount?: number;
  description?: string;
  checkingAccountId?: number;
  secondPartyId?: number;
}

// Bulk operations
export interface BulkCreateBanksRequest {
  banks: CreateBankRequest[];
}

export interface BulkCreateSecondPartiesRequest {
  secondParties: CreateSecondPartyRequest[];
}

// Pagination and API response types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage?: string;
    prevPage?: string;
  };
}

// export interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   data?: T;
//   pagination?: PaginationInfo;
// }

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage?: string;
  prevPage?: string;
}

// Account statement request
export interface AccountStatementRequest {
  checkingAccountId: number;
  startDate: Date;
  endDate: Date;
}

// Excel upload
export interface ExcelUploadResponse {
  message: string;
  count: number;
  errors?: Array<{
    row: number;
    errors: string[];
  }>;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  ssn: string;
}

export interface AuthResponse {
  user: User;
  accountHolder?: AccountHolder;
  accessToken: string;
  refreshToken: string;
}

// Filter types
export interface BankFilters {
  name?: string;
}

export interface SecondPartyFilters {
  name?: string;
  bankId?: number;
}

export interface AccountHolderFilters {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface CheckingAccountFilters {
  accountNumber?: string;
  accountHolderId?: number;
  isActive?: boolean;
}

export interface FixedDepositFilters {
  accountNumber?: string;
  accountHolderId?: number;
  isActive?: boolean;
  mature?: boolean;
}

export interface TransactionFilters {
  type?: 'debit' | 'credit';
  checkingAccountId?: number;
  secondPartyId?: number;
  startDate?: Date;
  endDate?: Date;
}

// Dashboard types
export interface AccountHolderDashboard {
  profile: AccountHolderWithUser;
  checkingAccounts: CheckingAccount[];
  fixedTermDeposits: FixedTermDeposit[];
  recentTransactions: TransactionWithDetails[];
  totalBalance: number;
}

export interface AdminDashboard {
  totalAccountHolders: number;
  totalCheckingAccounts: number;
  totalFixedDeposits: number;
  recentTransactions: TransactionWithDetails[];
  matureDeposits: FixedTermDepositWithDetails[];
}

// Form error types
export interface FieldError {
  field: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}

// API hook return types
export interface UseQueryResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
}

export interface UseMutationResult<T, V> {
  mutate: (variables: V) => void;
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  reset: () => void;
}



// Base query parameters with pagination
export interface BaseQueryParams extends PaginationParams {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Bank query parameters
export interface BanksQueryParams extends BaseQueryParams {
  name?: string;
  isActive?: boolean;
}

// Second Party query parameters
export interface SecondPartiesQueryParams extends BaseQueryParams {
  name?: string;
  bankId?: number;
  bankName?: string;
  details?: string;
}

// Account Holder query parameters
export interface AccountHoldersQueryParams extends BaseQueryParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  ssn?: string;
  userId?: number;
  isActive?: boolean;
}

// User query parameters (for admin user management)
export interface UsersQueryParams extends BaseQueryParams {
  email?: string;
  role?: 'admin' | 'account_holder';
  isActive?: boolean;
  lastLoginFrom?: Date;
  lastLoginTo?: Date;
}

// Checking Account query parameters
export interface CheckingAccountsQueryParams extends BaseQueryParams {
  accountNumber?: string;
  accountHolderId?: number;
  accountHolderName?: string;
  minBalance?: number;
  maxBalance?: number;
  isActive?: boolean;
  createdFrom?: Date;
  createdTo?: Date;
}

// Fixed Term Deposit query parameters
export interface FixedDepositsQueryParams extends BaseQueryParams {
  accountNumber?: string;
  accountHolderId?: number;
  accountHolderName?: string;
  minBalance?: number;
  maxBalance?: number;
  minTerm?: number;
  maxTerm?: number;
  minInterestRate?: number;
  maxInterestRate?: number;
  isActive?: boolean;
  mature?: boolean;
  maturityFrom?: Date;
  maturityTo?: Date;
  createdFrom?: Date;
  createdTo?: Date;
}

// Transaction query parameters
export interface TransactionsQueryParams extends BaseQueryParams {
  type?: 'debit' | 'credit';
  checkingAccountId?: number;
  accountNumber?: string;
  secondPartyId?: number;
  secondPartyName?: string;
  minAmount?: number;
  maxAmount?: number;
  minBalanceAfter?: number;
  maxBalanceAfter?: number;
  startDate?: Date;
  endDate?: Date;
  description?: string;
}

// Account Statement query parameters
export interface AccountStatementParams {
  checkingAccountId: number;
  startDate: Date;
  endDate: Date;
  type?: 'debit' | 'credit';
  minAmount?: number;
  maxAmount?: number;
}

// Dashboard query parameters
export interface DashboardQueryParams {
  dateFrom?: Date;
  dateTo?: Date;
  accountHolderId?: number;
  bankId?: number;
}

// Report query parameters
export interface ReportQueryParams {
  reportType: 'transaction' | 'account' | 'customer' | 'financial';
  dateFrom: Date;
  dateTo: Date;
  format?: 'pdf' | 'excel' | 'csv';
  includeDetails?: boolean;
}

// Bulk operation query parameters
export interface BulkOperationParams {
  operation: 'create' | 'update' | 'delete' | 'export';
  entityType: 'bank' | 'secondParty' | 'accountHolder' | 'checkingAccount' | 'fixedDeposit' | 'transaction';
  ids?: number[];
  filters?: any;
}

// Search query parameters
export interface SearchQueryParams {
  query: string;
  entityTypes?: ('bank' | 'secondParty' | 'accountHolder' | 'checkingAccount' | 'fixedDeposit' | 'transaction')[];
  limit?: number;
  offset?: number;
}

// Filter options for advanced filtering
export interface FilterOptions {
  field: string;
  operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan' | 'between' | 'in';
  value: any;
  value2?: any; // For between operator
}

// Advanced query parameters with multiple filters
export interface AdvancedQueryParams extends BaseQueryParams {
  filters?: FilterOptions[];
  include?: string[];
  fields?: string[];
}

// Export query parameters
export interface ExportQueryParams {
  format: 'csv' | 'excel' | 'pdf' | 'json';
  includeHeaders?: boolean;
  filename?: string;
  columns?: string[];
}

// Audit log query parameters
export interface AuditLogQueryParams extends BaseQueryParams {
  action?: string;
  entityType?: string;
  entityId?: number;
  userId?: number;
  dateFrom?: Date;
  dateTo?: Date;
}

// Notification query parameters
export interface NotificationsQueryParams extends BaseQueryParams {
  type?: string;
  isRead?: boolean;
  userId?: number;
  dateFrom?: Date;
  dateTo?: Date;
}

// File upload query parameters
export interface FileUploadParams {
  file: File;
  entityType: string;
  operation: 'create' | 'update';
  options?: {
    overwrite?: boolean;
    skipDuplicates?: boolean;
    validateOnly?: boolean;
  };
}

// API response metadata
export interface QueryMetadata {
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  filters?: any;
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
}

// Query result with metadata
export interface QueryResult<T> {
  data: T[];
  metadata: QueryMetadata;
}

// Helper types for building queries
export type QueryOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'ilike' | 'in' | 'isNull';

export interface QueryCondition {
  field: string;
  operator: QueryOperator;
  value: any;
}

export interface QuerySort {
  field: string;
  order: 'asc' | 'desc';
}

export interface QueryBuilderParams {
  conditions?: QueryCondition[];
  sorts?: QuerySort[];
  page?: number;
  limit?: number;
  includes?: string[];
}

// Utility types for specific entity queries
export type BankQuery = BanksQueryParams | QueryBuilderParams;
export type SecondPartyQuery = SecondPartiesQueryParams | QueryBuilderParams;
export type AccountHolderQuery = AccountHoldersQueryParams | QueryBuilderParams;
export type CheckingAccountQuery = CheckingAccountsQueryParams | QueryBuilderParams;
export type FixedDepositQuery = FixedDepositsQueryParams | QueryBuilderParams;
export type TransactionQuery = TransactionsQueryParams | QueryBuilderParams;

// Type guards for query parameters
export const isBaseQueryParams = (params: any): params is BaseQueryParams => {
  return params && (params.page !== undefined || params.limit !== undefined || params.search !== undefined);
};

export const isQueryBuilderParams = (params: any): params is QueryBuilderParams => {
  return params && (params.conditions !== undefined || params.sorts !== undefined);
};

// Helper function to convert query params to URL search params
export const buildQueryString = (params: any): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (value instanceof Date) {
        searchParams.append(key, value.toISOString());
      } else if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, v.toString()));
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });
  
  return searchParams.toString();
};

// Helper function to build advanced query from filter options
export const buildAdvancedQuery = (filters: FilterOptions[], sorts?: QuerySort[]): QueryBuilderParams => {
  const conditions: QueryCondition[] = filters.map(filter => {
    let operator: QueryOperator;
    
    switch (filter.operator) {
      case 'equals':
        operator = 'eq';
        break;
      case 'contains':
        operator = 'ilike';
        break;
      case 'greaterThan':
        operator = 'gt';
        break;
      case 'lessThan':
        operator = 'lt';
        break;
     
      case 'in':
        operator = 'in';
        break;
      default:
        operator = 'eq';
    }
    
    return {
      field: filter.field,
      operator,
      value: filter.value
    };
  });
  
  return {
    conditions,
    sorts: sorts || [],
    page: 1,
    limit: 100
  };
};