
export type SuperAdminData = {
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    email: string;
    secretCode: string;
 
  }
export type NewPasswordData ={
  password: string;
  confirmPassword: string;
}
export type LoginData ={
  password: string;
  username: string;
}

export type DecodedChangePasswordToken = {
  id:number;
  email:string;
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
    showPassword:()=>void;
    setNewPasswordData: React.Dispatch<React.SetStateAction<NewPasswordData>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    setLoginData: React.Dispatch<React.SetStateAction<LoginData>>;
    setSuperAdminData: React.Dispatch<React.SetStateAction<SuperAdminData>>;
    setValidated: React.Dispatch<React.SetStateAction<boolean>>;
    handleConfirmPasswordsChange: (
        data:SuperAdminData|NewPasswordData,
      e: React.ChangeEvent<HTMLInputElement>,
      setState: React.Dispatch<React.SetStateAction<SuperAdminData|NewPasswordData|LoginData>> 
    ) => void;
  
    handleSubmit:(data:SuperAdminData  ,event: React.FormEvent<HTMLFormElement>,domain:string,navigate:(path:string)=>void)=>void;
    handleChange:(data:SuperAdminData | NewPasswordData|LoginData, event:  React.ChangeEvent<HTMLInputElement>,setState: React.Dispatch<React.SetStateAction<SuperAdminData|NewPasswordData|LoginData>> )=>void
    handleSubmitForChangePassword:(data: NewPasswordData, event: React.FormEvent<HTMLFormElement>, navigate: (path: string) => void) =>void
  
    handleLoginSuperAdmin : (event:React.FormEvent<HTMLFormElement>,navigate:(path:string)=>void)=>void
    handleLoginAdmin : (event:React.FormEvent<HTMLFormElement>,navigate:(path:string)=>void)=>void
    handleLoginAccountHolder : (event:React.FormEvent<HTMLFormElement>,navigate:(path:string)=>void)=>void
   
    handleEmailVerification:(response: string,shouldReload:boolean,navigate:(path:string)=>void)=>void
   
  }
