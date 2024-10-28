import { useState, useEffect } from 'react';

interface Beneficiary {
  id: number;
  name: string;
}

const useBeneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/beneficiaries'); // Update this URL to your backend endpoint
        if (!response.ok) throw new Error('Failed to fetch beneficiaries');
        const data: Beneficiary[] = await response.json();
        setBeneficiaries(data);
      } catch (error: any) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBeneficiaries();
  }, []);

  return { beneficiaries, loading, error };
};

export default useBeneficiaries;
