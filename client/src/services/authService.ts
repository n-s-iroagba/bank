import { apiGet, apiPatch, apiPost } from "../api/api";
import { API_ENDPOINTS } from "../api/urls";
import { ChangePasswordRequest, LoginData, NewPassword, SuperAdminLoginData } from "../types/AuthContextType";


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
        alert(url)
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
      
      export const loginSuperAdmin = async (data:SuperAdminLoginData) => {
        const url = `${API_ENDPOINTS.superAdmin.login}`;
        try {
          const response = await apiPost<string,SuperAdminLoginData>(url, {...data });
          return response.data;
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Failed to log in');
        }
      };
      
      export const updateSuperAdminPassword = async (id:number,data:NewPassword) => {
        const url = `${API_ENDPOINTS.superAdmin.resetPassword}/${id}`
        try {
          const response = await apiPatch<string,NewPassword>(url, data);
          return response.data;
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Failed to change SuperAdmin password');
        }
      };
      
      
      export const requestToChangeSuperAdminPassword = async (data:ChangePasswordRequest) => {
           const url = `${API_ENDPOINTS.superAdmin.resetPassword}`
        try {
          const response = await apiPost<string,ChangePasswordRequest>(url, data );
          return response.data;
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Failed to request password reset');
        }
      };