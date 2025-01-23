import { useState, useEffect } from "react";
import { CheckingAccount } from "../types/CheckingAccount";
import { API_ENDPOINTS } from "../api/urls";
import axios from "axios";


const useCheckingAccount = (id: number) => {
    const [account, setAccount] = useState<CheckingAccount | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const checkingAccount = async () => {
        setLoading(true);
        try {
          alert('hi')
          const response = await axios.get(`${API_ENDPOINTS.checkingAccount.get}/${id}`)
          setAccount(response.data);
        } catch (err:any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      if (id) {
        checkingAccount();
      }
    }, [id]);
  
    return { account, loading, error };
  };
  
  export default useCheckingAccount;