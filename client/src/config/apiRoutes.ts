// API routes configuration
export const API_ROUTES = {
  // Authentication routes
  AUTH: {
    LOGIN: '/auth/login',
    APPLICANT_SIGNUP: '/auth/applicant/signup',
    SIGNUP_SUPER_ADMIN: '/auth/signup/super-admin',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION_CODE: '/auth/resend-verification-code',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    REFRESH_ACCESS_TOKEN: '/auth/refresh-token'
  },
  // Add to API_ROUTES in client/src/config/apiRoutes.ts
ACCOUNT_HOLDERS: {
  BASE: '/account-holders',
  BY_ID: (id: number) => `/api/account-holders/${id}`,
},

SECOND_PARTIES: {
  BASE: '/second-parties',
  BY_ID: (id: number) => `/api/second-parties/${id}`,
  BY_BANK: (bankId: number) => `/api/second-parties/bank/${bankId}`,
  BULK_FORM: '/second-parties/bulk-form',
  BULK_EXCEL: '/second-parties/bulk-excel',
},

// Account holder specific routes
ACCOUNT_HOLDER: {
  PROFILE: {
    BASE: '/account-holder/profile',
    DASHBOARD: (id: number) => `/account-holder/profile/dashboard/${id}`,
        PROFILE: {
      BASE: '/account-holder/profile',
    },
    
    ACCOUNTS: {
      CHECKING: '/account-holder/accounts/checking-accounts',
      FIXED_DEPOSITS: '/account-holder/accounts/fixed-deposits',
    },
    
    TRANSACTIONS: {
      BASE: '/account-holder/transactions',
      STATEMENT: (checkingAccountId: number) => 
        `/account-holder/transactions/statement/${checkingAccountId}`,
    },
  },
  ACCOUNTS: {
    BASE: '/account-holder/accounts',
    CHECKING: '/account-holder/accounts/checking-accounts',
    FIXED_DEPOSITS: '/account-holder/accounts/fixed-deposits',
  },
  TRANSACTIONS: {
    BASE: '/account-holder/transactions',
    STATEMENT: (checkingAccountId: number) => 
      `/account-holder/transactions/statement/${checkingAccountId}`,
  
  },
},
  // Admin routes
  ADMIN: {
    BANKS: {
      BASE: '/banks',
      BY_ID: (id: number) => `/banks/${id}`,
      BULK_FORM: '/banks/bulk-form',
      BULK_EXCEL: '/banks/bulk-excel',
    },
    
    SECOND_PARTIES: {
      BASE: '/second-parties',
      BY_ID: (id: number) => `/second-parties/${id}`,
      BY_BANK: (bankId: number) => `/second-parties/bank/${bankId}`,
      BULK_FORM: '/second-parties/bulk-form',
      BULK_EXCEL: '/second-parties/bulk-excel',
    },
    
    ACCOUNT_HOLDERS: {
      BASE: '/account-holders',
      BY_ID: (id: number) => `/api/account-holders/${id}`,
    },
    
    CHECKING_ACCOUNTS: {
      BASE: '/checking-accounts',
      BY_ID: (id: number) => `/api/checking-accounts/${id}`,
      BY_ACCOUNT_HOLDER: (accountHolderId: number) => 
        `/api/checking-accounts/account-holder/${accountHolderId}`,
    },
    
    FIXED_DEPOSITS: {
      BASE: '/fixed-deposits',
      BY_ID: (id: number) => `/api/fixed-deposits/${id}`,
      BY_ACCOUNT_HOLDER: (accountHolderId: number) => 
        `/api/fixed-deposits/account-holder/${accountHolderId}`,
      MATURE_DEPOSITS: '/fixed-deposits/mature/deposits',
    },
    
    TRANSACTIONS: {
      BASE: '/transactions',
      BY_ID: (id: number) => `/api/transactions/${id}`,
      BY_CHECKING_ACCOUNT: (checkingAccountId: number) => 
        `/api/transactions/checking-account/${checkingAccountId}`,
      STATEMENT: (checkingAccountId: number) => 
        `/api/transactions/statement/${checkingAccountId}`,
       BY_SECOND_PARTY:(id:number|string)=>``
    },
  },

  
  // Utility endpoints
  UTILITY: {
    HEALTH: '/health',
  },
};

// Helper function to build query strings
export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, v.toString()));
      } else if (value instanceof Date) {
        searchParams.append(key, value.toISOString());
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

// Helper function to build paginated URLs
export const buildPaginatedUrl = (
  baseUrl: string,
  page: number = 1,
  limit: number = 10,
  filters: Record<string, any> = {}
): string => {
  const params = {
    page,
    limit,
    ...filters,
  };
  
  return `${baseUrl}${buildQueryString(params)}`;
};

// Type for API routes
export type ApiRoutes = typeof API_ROUTES;