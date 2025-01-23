import { useEffect, useState } from "react";
import { Transaction } from "../types/Transaction";
import { API_ENDPOINTS } from "../api/urls";
import axios from "axios";

const useGetTransactions = (id: number) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_ENDPOINTS.transaction.get}/${id}`, {
          signal: controller.signal,
        });
        console.log(response)
        setTransactions(response.data);
      } catch (err: any) {
        if (err.name !== "CanceledError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTransactions();
    }

    return () => {
      controller.abort();
    };
  }, [id]);

  return { transactions, loading, error };
};

export default useGetTransactions;
