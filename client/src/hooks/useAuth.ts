import { useState, useEffect } from "react";
import { JWTService } from "../services/JWTService";
import { useNavigate } from "react-router-dom";

interface AuthData {
  adminId: number;
  superAdminId: number|null;
  username: string;
}

const useAuth = (): AuthData => {
  const [authData, setAuthData] = useState<AuthData>({
    adminId:0,
    superAdminId: null,
    username: "",
  });
  const navigate = useNavigate()
  useEffect(() => {
    const fetchAuthData = () => {
  
      const authToken = JWTService.getLoginToken()
      if (authToken) {
        try {
    
          const decodedToken = JWTService.decodeToken<AuthData>(authToken)
          setAuthData({
            adminId: decodedToken.adminId,
            superAdminId: decodedToken.superAdminId,
            username: decodedToken.username,
          });
        } catch (error) {
          alert('You are not logged in')
          
          console.error("Invalid authentication token");
          navigate('/admin/login')
        }
      }
    };

    fetchAuthData();
  }, [navigate]);

  return authData;
};

export default useAuth;
