import { apiGet, apiPatch, apiPost } from "../api/api";
import { API_ENDPOINTS } from "../api/urls";
import { ForgotPassword, LoginData, NewPassword } from "../types/AuthContextType";



export const loginAccountHolder = async (data:LoginData) => {
    const url = `${API_ENDPOINTS.accountHolder.login}`
    try {
      const response = await apiPost<string,LoginData>(url, data);
    
        return response.data;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to log in');
      }
    };

export const loginAdmin = async (data:LoginData) => {
    const url = `${API_ENDPOINTS.admin.login}`
  
    try {
      const response = await apiPost<string,LoginData>(url, data);
        return response.data;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to log in');
      }
    };

    export const verifySuperAdminEmail = async (id:number, code:{code:number}) => {
        const url = `${API_ENDPOINTS.superAdmin.verifyEmail}/${id}`;
  
        try {
          const response = await apiPatch<string,{code:number}>(url,  code );
          return response.data;
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Failed to verify email');
        }
      };
    export const requestNewVerificationCode = async (id:number)=>{
      const url =`${API_ENDPOINTS.superAdmin.requestNewCode}/${id}`
      try {
        const response = await apiGet<string>(url );
        return response.data;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to verify email');
      }
    }      
      
      export const loginSuperAdmin = async (data:LoginData) => {
        const url = `${API_ENDPOINTS.superAdmin.login}`;
        try {
          const response = await apiPost<string,LoginData>(url, {...data });
          return response.data;
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Failed to log in');
        }
      };
      
      export const resetPassword = async (id:number,data:NewPassword) => {
        const url = `${API_ENDPOINTS.superAdmin.resetPassword}/${id}`
        alert (url)
        try {
          const response = await apiPatch<string,NewPassword>(url, data);
          return response.data;
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Failed to change SuperAdmin password');
        }
      };
      
      
      export const forgotPassword = async (data:ForgotPassword) => {
           const url = API_ENDPOINTS.superAdmin.forgotPassword
        try {
          const response = await apiPost<string,ForgotPassword>(url, data );
          return response.data;
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Failed to request password reset');
        }
      };