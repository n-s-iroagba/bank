import { useState, useEffect } from "react";
import { getCheckingAccount } from "../services/checkingAccountService";
import { CheckingAccount } from "../types/CheckingAccount";


const useCheckingAccount = (id: number) => {
    const [account, setAccount] = useState<CheckingAccount | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchAccountHolder = async () => {
        setLoading(true);
        try {
          const data = await getCheckingAccount(id);
          setAccount(data as CheckingAccount);
        } catch (err:any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      if (id) {
        fetchAccountHolder();
      }
    }, [id]);
  
    return { account, loading, error };
  };
  
  export default useCheckingAccount;