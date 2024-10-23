
import { jwtDecode } from "jwt-decode";



import { DecodedChangePasswordToken, DecodedLoginToken, DecodedVerificationToken } from "../types/authTypes";
import axios from "../../common/utils/index";

export const getLoginDecodedToken = (): DecodedLoginToken | null => {
  const token = localStorage.getItem('cassockJwtToken');
  
  if (!token) {
      return null;
  }

  try {
      const decodedToken = jwtDecode<DecodedLoginToken>(token);
      return decodedToken;
  } catch (error) {
      console.error('Error decoding token:', error);
      return null;
  }
};


  export const getVerificationTokenData = (token:string):DecodedVerificationToken|null=>{
    const decoded:DecodedVerificationToken|null= jwtDecode(token)
    return decoded;
  }
    
  export const decodeChangePasswordToken = (token:string) => {
  
    const decoded : DecodedChangePasswordToken |null= jwtDecode(token)
  return decoded
  };

export const logOut = (navigate:(path:string)=>void)=>{
    localStorage.removeItem('cassockJwtToken')
    localStorage.removeItem('cassockId')
    localStorage.removeItem('cassockVerified')
    localStorage.removeItem('cassockEmailVerificationToken')
    localStorage.removeItem('cassockInvestment');

   navigate('/')
  }



  export const postData = async (url: string, data: any, token?: string) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    try {
      const response = await axios.post(url, data, { headers });
      return response;
    } catch (error:any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };