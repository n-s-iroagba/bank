import { CreateSuperAdmin } from "./SuperAdmin";


export type SuperAdminData = CreateSuperAdmin & {
    secretCode: string;
    confirmPassword:string
  }
export type NewPasswordInput ={
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
export type ForgotPassword = {
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
    newPasswordInput:NewPasswordInput,
    submitting: boolean;
    errorMessage: string;
    passwordType:string;
    passwordValidityMessage:string[]
    isMatchingPassword:boolean
    loginData:LoginData
    validated: boolean;
   

    handleForgotPassword:(event: React.FormEvent<HTMLFormElement>,navigate:(path:string)=>void)=>void
    showPassword:()=>void;
    setNewPasswordInput: React.Dispatch<React.SetStateAction<NewPasswordInput>>;
    setForgotPasswordInput: React.Dispatch<React.SetStateAction<ForgotPassword>>
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    setLoginData: React.Dispatch<React.SetStateAction<LoginData>>;
    setSuperAdminData: React.Dispatch<React.SetStateAction<SuperAdminData>>;
    setValidated: React.Dispatch<React.SetStateAction<boolean>>;
    handleChangeForConfirmPassword: (
      e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>,
        data:SuperAdminData|NewPasswordInput,
      
      setState: React.Dispatch<React.SetStateAction<any>> 
    ) => void;
    handleSubmit:(event: React.FormEvent<HTMLFormElement>,navigate:(path:string)=>void)=>void;
    handleChange:( event:  React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>,
      setState: React.Dispatch<React.SetStateAction<any>> )=>void
    handleResetPassword:(event: React.FormEvent<HTMLFormElement>, navigate: (path: string) => void) =>void
    handleLoginAdmin : (event:React.FormEvent<HTMLFormElement>,navigate:(path:string)=>void)=>void
    handleLoginAccountHolder : (event:React.FormEvent<HTMLFormElement>,navigate:(path:string)=>void)=>void
  
  }