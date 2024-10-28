import axios from "axios";


export const fetchTransactions = async (token: string) => {
  return await axios.get('/transfers'); // Adjust the endpoint as needed
};
