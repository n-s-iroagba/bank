

// Format currency
export const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
  };
  
  // Format date
  export const formatDate = (date: string | Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  // Validate account form data
  export const validateAccountData = (data: any): boolean => {
    const { checkingbalance, numberOfTransfers } = data;
    return checkingbalance > 0 && numberOfTransfers > 0;
  };
  

  
  export function extractErrorCode(errorMessage:string) {
    const regex = /status code (\d+)/;
    const match = errorMessage.match(regex); 
    if (match && match.length > 1) {
      return parseInt(match[1]); 
    }
    return null;
  }

  export const hasEmptyKey = (obj:any): boolean => {
    for (const key in obj) {
      if (!key||key==='') {
        return true;
      }
    }
    return false;
  };



