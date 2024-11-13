import React, {
  createContext,
  useState,
  ReactNode,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

import { doPasswordsMatch } from "../utils/utils";

import {
  AuthContextType,
  NewPasswordData,
  LoginData,
  SuperAdminData,
  SuperAdminLoginData,
  ChangePasswordRequest,
  NewPassword,
} from "../types/authTypes";
import { loginAdmin } from "../../../services/adminService";
import { changeSuperAdminPassword, loginSuperAdmin, registerSuperAdmin, requestSuperAdminPasswordChange } from "../../../services/superAdminService";

import { loginAccountHolder } from "../../../services/accountHolderService";
import { CreateSuperAdmin } from "../../../types/SuperAdmin";
import { getIdFromChangePasswordToken } from "../helpers/helper";
import { mockAuthContext } from "../types/data";



export const AuthContext = createContext<AuthContextType>(mockAuthContext);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [passwordValidityMessage, setPasswordValidityMessage] = useState<string[]>([]);
 
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isMatchingPassword, setIsMatchingPassword] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);
  const [passwordType, setPasswordType] = useState<'password'|'text'>('password')

  const [superAdminData, setSuperAdminData] = useState<SuperAdminData>({
    firstname: "",
    surname: "",
    username:'',
    password: "",
    confirmPassword: "",
    email: "",
    secretCode: "",
  });

  const [newPasswordData, setNewPasswordData] = useState<NewPasswordData>({
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState<LoginData>({
    password: "",
    username: "",
  });

  const [superAdminLoginData, setSuperAdminLoginData] = useState<SuperAdminLoginData>({
    email: "",
    password: "",
  });

  const [changePasswordData, setChangePasswordData] = useState<ChangePasswordRequest>({
    email:''
  })


  // Helper function to validate password and set validation messages
  const validatePassword = (password: string) => {
    const tempPasswordState: string[] = [];
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const length = password.length;

    if (!hasNumber) tempPasswordState.push("Password must contain a number");
    if (!hasUppercase)
      tempPasswordState.push("Password must contain an uppercase letter");
    if (!hasLowercase)
      tempPasswordState.push("Password must contain a lowercase letter");
    if (length < 8)
      tempPasswordState.push("Password must be at least 8 characters");

    setPasswordValidityMessage(tempPasswordState);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>,
    setState: Dispatch<
      SetStateAction<SuperAdminData | NewPasswordData | LoginData |SuperAdminLoginData|ChangePasswordRequest>
    >
  ) => {
    e.preventDefault();

    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
  };

  const handleChangeForConfirmPassword = (
    e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>,
    data: SuperAdminData | NewPasswordData,
    setState: Dispatch<
      SetStateAction<any>
    >
  ) => {
    handleChange( e, setState);

    if ("password" in data) {
      setIsMatchingPassword(doPasswordsMatch(data.password, e.target.value));
    }
  };

  const showPassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");

  };



//CREATE_SUPERADMIN
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
    navigate: (path: string) => void
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const secretCodeMatch =
    superAdminData.secretCode === process.env.REACT_APP_ADMIN_SECRET_KEY;
    setValidated(true);
    if (
      form.checkValidity() === false ||
      passwordValidityMessage.length ||
      !isMatchingPassword ||
      !secretCodeMatch
    ) {
      setErrorMessage(
        !secretCodeMatch
          ? "The secret code provided is wrong."
          : "Please fill in all fields and ensure passwords match."
      );
      return;
    }
    setSubmitting(true);
    try {
      const response = await registerSuperAdmin( superAdminData as CreateSuperAdmin);
      if (response.status === 201) {
        handleEmailVerification(response, false, navigate);
      } else if (response.status === 409) {
        setErrorMessage("This email is already registered");
      } else {
        setErrorMessage("Something went wrong, please try again later");
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmailVerification = (
    response: any,
    shouldReload = false,
    navigate: (path: string) => void
  ) => {
    localStorage.setItem(
      "EmailVerificationId",
      JSON.stringify(response.data.id)
    );
    shouldReload
      ? window.location.reload()
      : navigateToVerifyEmailPage(navigate);
  };

  const navigateToVerifyEmailPage = (navigate: (path: string) => void) => {
    navigate("/verify-email");
  };


  //LOGIN_SUPERADMIN
  const handleLoginSuperAdmin = async (
    event: FormEvent<HTMLFormElement>,
    navigate: (path: string) => void
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);

    if (form.checkValidity() === false) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await loginSuperAdmin(superAdminLoginData);
      handleLoginResponseSuperAdmin(response, navigate);
    } catch (error: any) {
      setErrorMessage("Sorry we can not log you in at this moment");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoginResponseSuperAdmin = (
    response: any,
    navigate: (path: string) => void
  ) => {
    if (response.status === 200) {
      localStorage.setItem("bankToken", JSON.stringify(response.data));
      navigate("/super-admin/dashboard");
    } else if (response.status === 201) {
      handleEmailVerification(response, false, navigate);
    } else {
      setErrorMessage("Cannot complete request at this time try again Later");
    }
  };


  //ADMIN
  const handleLoginAdmin = async (
    event: FormEvent<HTMLFormElement>,
    navigate: (path: string) => void
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);

    if (form.checkValidity() === false) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    try {
      const response = loginAdmin(loginData)
      handleLoginResponseAdmin(response, navigate);
    } catch (error: any) {
      setErrorMessage("Sorry we can not log you in at this moment");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoginResponseAdmin = (
    response: any,
    navigate: (path: string) => void
  ) => {
    if (response.status === 200) {
      localStorage.setItem("bankToken", JSON.stringify(response.data));
      navigate("/admin/dashboard");
    } else {
      setErrorMessage("Cannot complete request at this time try again Later");
    }
  };


//ACCOUNT_HOLDER
  const handleLoginAccountHolder = async (
    event: FormEvent<HTMLFormElement>,
    navigate: (path: string) => void
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);

    if (form.checkValidity() === false) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await loginAccountHolder(loginData)
      handleLoginResponseAccountHolder(response, navigate);
    } catch (error: any) {
      setErrorMessage("Sorry we can not log you in at this moment");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoginResponseAccountHolder = (
    response: any,
    navigate: (path: string) => void
  ) => {
    if (response.status === 200) {
      localStorage.setItem("bankToken", JSON.stringify(response.data));
      navigate("/dashboard");
    } else {
      setErrorMessage("Cannot complete request at this time try again Later");
    }
  };


  //PASSWORD CHANGE
  const handleRequestPasswordChange = async (
    event: FormEvent<HTMLFormElement>,
    navigate: (path: string) => void
  )=>{
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      setErrorMessage("Kindly enter your email.");
      return;
    }
    setSubmitting(true);
  
    try{
      const response = await requestSuperAdminPasswordChange(changePasswordData)
      if (response.status === 200){
        localStorage.setItem('bankChangePasswordToken', JSON.stringify(response.data))
        navigate('/new-password')
      }
    }catch(error:any){
      setErrorMessage('sorry you request cannot be completed, contact your developer')
console.error(error)
    }
  }


  const handleSubmitForChangePassword = async (
    event: FormEvent<HTMLFormElement>,
    navigate: (path: string) => void
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (
      form.checkValidity() === false ||
      passwordValidityMessage.length ||
      !isMatchingPassword
    ) {
      return;
    }

    const token = localStorage.getItem('bankChangePasswordToken');
    if (!token) {
      setErrorMessage("You are not authorized to make this request");
      return;
    }
    const id = getIdFromChangePasswordToken(token);

    if (!id) {
      setErrorMessage("You are not authorized to make this request");
      return;
    }

    setSubmitting(true);
    try {
      const response = await changeSuperAdminPassword(id,newPasswordData as NewPassword);
      if (response.status === 200) {
        localStorage.setItem("JwtToken", JSON.stringify(response.data));
        navigate("/superadmin/dashboard");
      }
    } catch (error: any) {
      alert("An error occurred, kindly try again later");
    } finally {
      setSubmitting(false);
    }
  };

  const authContextValue: AuthContextType = {
    superAdminData,
    submitting,
    loginData,
    errorMessage,
    validated,
    isMatchingPassword,
    passwordType,
    passwordValidityMessage,
    newPasswordData,
    superAdminLoginData,
    setChangePasswordData,
    setValidated,
    setSuperAdminLoginData,
    setErrorMessage,
    setSuperAdminData,
    setNewPasswordData,
    setLoginData,
    handleChangeForConfirmPassword,
    handleSubmit,
    handleChange,
    handleRequestPasswordChange ,
    handleSubmitForChangePassword,
    handleEmailVerification,
    showPassword,
    handleLoginAccountHolder,
    handleLoginAdmin,
    handleLoginSuperAdmin,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
