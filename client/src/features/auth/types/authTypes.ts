import { CreateSuperAdmin } from "../../../types/SuperAdmin";

export type SuperAdminData = CreateSuperAdmin & {
    secretCode: string;
    confirmPassword:string
  }
export type NewPasswordData ={
  password: string;
  confirmPassword: string;
}
export type LoginData ={
  password: string;
  username: string;
}
export type SuperAdminLoginData ={
  password: string;
  email: string;
}
export type DecodedChangePasswordToken = {
  id:number;
  email:string;
}
export type ChangePasswordRequest = {
  email:string;
}

export type NewPassword={
  password:string;
}

export  enum Role {
ACCOUNTHOLDER = 'ACCOUNTHOLDER',
ADMIN = 'ADMIN',
SUPERADMIN ='SUPERADMIN',

}

export type DecodedLoginToken = {
  id: string;            
  email: string;       
  role: Role;           
}         

export type DecodedVerificationToken= {
  id: string;           
  email: string;        
  iat: number;           
}
export type AuthContextType ={
    superAdminData:SuperAdminData,
    newPasswordData:NewPasswordData,
    submitting: boolean;
    errorMessage: string;
    passwordType:string;
    passwordValidityMessage:string[]
    isMatchingPassword:boolean
    loginData:LoginData
    validated: boolean;
    superAdminLoginData:SuperAdminLoginData
    setSuperAdminLoginData: React.Dispatch<React.SetStateAction<SuperAdminLoginData>>;
    handleRequestPasswordChange:(event: React.FormEvent<HTMLFormElement>,navigate:(path:string)=>void)=>void
    showPassword:()=>void;
    setNewPasswordData: React.Dispatch<React.SetStateAction<NewPasswordData>>;
    setChangePasswordData: React.Dispatch<React.SetStateAction<ChangePasswordRequest>>
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    setLoginData: React.Dispatch<React.SetStateAction<LoginData>>;
    setSuperAdminData: React.Dispatch<React.SetStateAction<SuperAdminData>>;
    setValidated: React.Dispatch<React.SetStateAction<boolean>>;
    handleChangeForConfirmPassword: (
      e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>,
        data:SuperAdminData|NewPasswordData,
      
      setState: React.Dispatch<React.SetStateAction<any>> 
    ) => void;
  
    handleSubmit:(event: React.FormEvent<HTMLFormElement>,navigate:(path:string)=>void)=>void;
    handleChange:( event:  React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>,
      setState: React.Dispatch<React.SetStateAction<any>> )=>void
    handleSubmitForChangePassword:(event: React.FormEvent<HTMLFormElement>, navigate: (path: string) => void) =>void
  
    handleLoginSuperAdmin : (event:React.FormEvent<HTMLFormElement>,navigate:(path:string)=>void)=>void
    handleLoginAdmin : (event:React.FormEvent<HTMLFormElement>,navigate:(path:string)=>void)=>void
    handleLoginAccountHolder : (event:React.FormEvent<HTMLFormElement>,navigate:(path:string)=>void)=>void
   
    handleEmailVerification:(response: string,shouldReload:boolean,navigate:(path:string)=>void)=>void
   
  }