import axios from "axios";
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../api/urls";
import { TermDepositAccount } from "../types/TermDepositAccount";

const useGetTermDepositAccount = (id:number)=>{
  const [account, setAccount] = useState<TermDepositAccount | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      setLoading(true);
      try {
        alert('hi')
        const response = await axios.get(`${API_ENDPOINTS.termDepositAccount.get}/${id}`)
        console.log('data', response.data)
        setAccount(response.data);
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAccount();
    }
  }, [id]);

  return { account, loading, error };
}
export default useGetTermDepositAccount