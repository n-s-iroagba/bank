import { useState, useEffect } from 'react';
import { getAllAdmins } from '../services/adminService';
import { Admin } from '../types/Admin';


interface UseAdminsResult {
  admins: Admin[];
  adminError: string | null;
  adminLoading: boolean;
}

const useAdmins = (id:number): UseAdminsResult => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [adminError, setadminError] = useState<string | null>(null);
  const [adminLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const data = await getAllAdmins(id);
        setAdmins(data);
      } catch (err: any) {
        setadminError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [id]);

  return { admins, adminError, adminLoading };
};

export default useAdmins;
