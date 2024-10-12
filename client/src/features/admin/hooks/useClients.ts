
import { useState, useEffect } from 'react';
import { post, patch,get } from '../../../utils/api';


export interface Client {
  id: number;
  username: string;
  balance: number;
  password?: string;
}

const useUsers = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = 'your-auth-token'; // Replace with real token
  
  useEffect(() => {
    const fetchUsers = async () => {
        setLoading(true); // Start loading
        setError(null); // Reset any previous error
    
        try {
          // Fetch clients and type the response
          const data = await get<any>('/clients', token);
    
          // Check if the data is of type Client[]
          if (Array.isArray(data)) {
            setClients(data); // Set clients only if data is an array
          } else {
            console.error('Expected an array of clients:', data);
            setError('Unexpected response format'); // Handle unexpected format
          }
        } catch (err) {
          console.error('Error fetching clients:', err); // Log the error for debugging
          setError('Error fetching clients');
        } finally {
          setLoading(false); // Stop loading regardless of the outcome
        }
      };

    fetchUsers();
  }, [token]);

  const createClient = async (newUser: Omit<Client, 'id'>) => {
    try {
      const createdUser = await post<Client>('/clients', newUser, token);
      setClients((prevUsers) => [...prevUsers, createdUser]);
    } catch (err) {
      setError('Error creating user');
    }
  };

  const updateClient = async (userId: number, updatedUser: Partial<Client>) => {
    try {
      const updated = await patch<Client>(`/clients/${userId}`, updatedUser, token);
      setClients((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? updated : user))
      );
    } catch (err) {
      setError('Error updating user');
    }
  };

  const updateBalance = async (userId: number, amount: number) => {
    try {
      const updatedUser = await patch<Client>(`/clients/${userId}/balance`, { amount }, token);
      setClients((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? updatedUser : user))
      );
    } catch (err) {
      setError('Error updating balance');
    }
  };

  return { clients, loading, error, createClient, updateClient, updateBalance };
};

export default useUsers;
