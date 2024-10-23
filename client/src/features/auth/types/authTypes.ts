



  export interface SuperAdminData {
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    email: string;
    secretCode: string;
 
  }
export interface NewPasswordData{
  password: string;
  confirmPassword: string;
}
export interface LoginData{
  password: string;
  email: string;
}
export interface AuthContextType {
    superAdminData:SuperAdminData,
    newPasswordData:NewPasswordData,
    setNewPasswordData: React.Dispatch<React.SetStateAction<NewPasswordData>>,
    submitting: boolean;
    errorMessage: string;
    passwordType:string;
    passwordValidityMessage:string[]
    setSuperAdminData: React.Dispatch<React.SetStateAction<SuperAdminData>>;

    
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    validated: boolean;
    setValidated: React.Dispatch<React.SetStateAction<boolean>>;
    handleConfirmPasswordsChange: (
        data:SuperAdminData|NewPasswordData,
      e: React.ChangeEvent<HTMLInputElement>,
      setState: React.Dispatch<React.SetStateAction<SuperAdminData|NewPasswordData>> 
    ) => void;
  

    showPassword: () => void;
    handleSubmit:(data:SuperAdminData  ,event: React.FormEvent<HTMLFormElement>,domain:string,navigate:(path:string)=>void)=>void;
    handleChange:(data:SuperAdminData | NewPasswordData, event:  React.ChangeEvent<HTMLInputElement>,setState: React.Dispatch<React.SetStateAction<SuperAdminData|NewPasswordData>> )=>void
    handleSubmitForChangePassword:(data: NewPasswordData, event: React.FormEvent<HTMLFormElement>, navigate: (path: string) => void) =>void
    isMatchingPassword:boolean
    loginData:LoginData
    handleLoginSuperAdmin : (event:React.FormEvent<HTMLFormElement>,navigate:(path:string)=>void)=>void
    handleLoginAdmin : (event:React.FormEvent<HTMLFormElement>,navigate:(path:string)=>void)=>void
    handleLoginClient : (event:React.FormEvent<HTMLFormElement>,navigate:(path:string)=>void)=>void
    handleLoginChange :(e: React.ChangeEvent<HTMLInputElement>,navigate:(path:string)=>void)=>void
    handleEmailVerification:(response: any,shouldReload:boolean,navigate:(path:string)=>void)=>void
   
  }
  export interface DecodedChangePasswordToken {
    id:number;
    email:string;
    role:Role
}

export  enum Role {
  CLIENT = 'client',
  ADMIN = 'admin',
  SUPERADMIN ='superadmin'
  
  }



  export interface DecodedLoginToken {
    id: string;            
    email: string;       
    role: Role;           
    exp: number;           
    iat: number; 
  }         
  
  export interface DecodedVerificationToken {
    id: string;           
    email: string;        
    iat: number;           
    secretCode?: string;
  }
