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

import { AuthContextType, NewPasswordData, LoginData, Role, DecodedChangePasswordToken,SuperAdminData } from "../types/authTypes";
import { decodeChangePasswordToken, postData } from "../helpers/helper";
import { extractErrorCode } from "../../common/utils/helpers";
import { loginUrlForAdmin, loginUrlForClient, loginUrlForSuperAdmin, newPasswordRoute } from "../../common/data/routes";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [passwordValidityMessage, setPasswordValidityMessage] = useState<string[]>([]);
  const [passwordType, setPasswordType] = useState<string>("password");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isMatchingPassword, setIsMatchingPassword] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);

  const [superAdminData, setSuperAdminData] = useState<SuperAdminData>({
    firstName: "",
    lastName: "",
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
    email: "",
  });

  // Helper function to validate password and set validation messages
  const validatePassword = (password: string) => {
    const tempPasswordState: string[] = [];
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const length = password.length;

    if (!hasNumber) tempPasswordState.push("Password must contain a number");
    if (!hasUppercase) tempPasswordState.push("Password must contain an uppercase letter");
    if (!hasLowercase) tempPasswordState.push("Password must contain a lowercase letter");
    if (length < 8) tempPasswordState.push("Password must be at least 8 characters");

    setPasswordValidityMessage(tempPasswordState);
  };
  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({...loginData, [e.target.name]: e.target.value });
  };
  const handleChange = (
    data: SuperAdminData | NewPasswordData,
    e: ChangeEvent<HTMLInputElement>,
    setState: Dispatch<SetStateAction<SuperAdminData | NewPasswordData>>
  ) => {
    e.preventDefault();
    setState({
      ...data,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
  };

  const handleConfirmPasswordsChange = (
    data: SuperAdminData | NewPasswordData,
    e: ChangeEvent<HTMLInputElement>,
    setState: Dispatch<SetStateAction<SuperAdminData | NewPasswordData>>
  ) => {
    handleChange(data, e, setState);
    setIsMatchingPassword(doPasswordsMatch(data.password, e.target.value));
  };

  const showPassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleSubmit = async (
    data: SuperAdminData,
    event: FormEvent<HTMLFormElement>,
    domain: string,
    navigate: (path: string) => void
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const secretCodeMatch = data.secretCode === process.env.REACT_APP_ADMIN_SECRET_KEY;

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
      const response = await postData(domain, data);
      if (response.status === 201) {
        handleEmailVerification(response, false, navigate);
      } else if (response.status === 409) {
        setErrorMessage("This email is already registered");
      } else {
        setErrorMessage("Something went wrong, please try again later");
      }
    } catch (error: any) {
      handleServerError(error, 409, "User with this email already exists");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmailVerification = (response: any, shouldReload = false, navigate: (path: string) => void) => {
    localStorage.setItem("cassockEmailVerificationToken", JSON.stringify(response.data));
    shouldReload ? window.location.reload() : navigateToVerifyEmailPage(navigate);
  };

  const navigateToVerifyEmailPage = (navigate: (path: string) => void) => {
    navigate("/verify-email");
  };

  const postChangePasswordData = async (url: string, data: { password: string }, token: string) => {
    return postData(url, data, token);
  };

  const handleSubmitForChangePassword = async (
    data: NewPasswordData,
    event: FormEvent<HTMLFormElement>,
    navigate: (path: string) => void
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || passwordValidityMessage.length || !isMatchingPassword) {
      return;
    }

    const token = localStorage.getItem("cassockChangePasswordToken");
    const decodedToken = getIdFromChangePasswordToken(token);

    if (!decodedToken || !token) {
      setErrorMessage("You are not authorized to make this request");
      return;
    }

    setSubmitting(true);
    try {
      const response = await postChangePasswordData(
        `${newPasswordRoute}/${decodedToken.id}`,
        { password: data.password },
        token
      );
      if (response.status === 200) {
        localStorage.setItem("cassockJwtToken", JSON.stringify(response.data));
        navigate(decodedToken.role === Role.ADMIN 
          ? "/admin/dashboard" 
          : decodedToken.role === Role.SUPERADMIN 
            ? "/super/dashboard" 
            : "/dashboard"
        );
        
      }
    } catch (error: any) {
      alert("An error occurred, kindly try again later");
    } finally {
      setSubmitting(false);
    }
  };

  const getIdFromChangePasswordToken = (token: string | null): DecodedChangePasswordToken | null => {
    const decodedToken: DecodedChangePasswordToken | null = token ? decodeChangePasswordToken(token) : null;
    if (!token || !decodedToken) {
      setErrorMessage("You are not authorized to make this request");
    }
    return decodedToken;
  };

  // Handle Login
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
      const response = await postData(loginUrlForAdmin, loginData);
      handleLoginResponseAdmin(response, navigate);
    } catch (error: any) {
      handleLoginError(error);
    } finally {
      setSubmitting(false);
    }
  };

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
      const response = await postData(loginUrlForSuperAdmin, loginData);
      handleLoginResponseSuperAdmin(response, navigate);
    } catch (error: any) {
      handleLoginError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoginClient = async (
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
      const response = await postData(loginUrlForClient, loginData);
      handleLoginResponseClient(response, navigate);
    } catch (error: any) {
      handleLoginError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoginResponseClient = (response: any, navigate: (path: string) => void) => {
    if (response.status === 200) {
      localStorage.setItem("bankToken", JSON.stringify(response.data));
    navigate('/dashboard');
    }else{
      setErrorMessage("Cannot complete request at this time try again Later");
    }
   
  };

  const handleLoginResponseAdmin = (response: any, navigate: (path: string) => void) => {
    if (response.status === 200) {
      localStorage.setItem("bankToken", JSON.stringify(response.data));
    navigate('/admin/dashboard');
    }else{
      setErrorMessage("Cannot complete request at this time try again Later");
    }
   
  }; 
   const handleLoginResponseSuperAdmin = (response: any, navigate: (path: string) => void) => {
    if (response.status === 200) {
      localStorage.setItem("bankToken", JSON.stringify(response.data));
      navigate('/super-admin/dashboard'); 
    } else if (response.status === 201) {
      handleEmailVerification(response, false, navigate);
    }else{
      setErrorMessage("Cannot complete request at this time try again Later");
    }
  };


  const handleLoginError = (error: any) => {
    const code = extractErrorCode(error.message);
    if (code === 403) {
      setErrorMessage("Invalid password.");
    } else if (code === 404) {
      setErrorMessage("You are not yet registered on our platform.");
    } else {
      setErrorMessage("Our server is currently down. Please try again later.");
    }
  };

  const handleServerError = (error: any, code: number, defaultMessage: string) => {
    const errorCode = extractErrorCode(error.message);
    if (errorCode === code) {
      setErrorMessage(defaultMessage);
    } else {
      setErrorMessage("Our server is currently down. Please try again later.");
    }
  };

  // Context value to be passed down to components
  const authContextValue: AuthContextType = {
    setSuperAdminData,
    superAdminData,
    submitting,
    loginData,
    errorMessage,
    setErrorMessage,
    validated,
    setValidated,
    handleConfirmPasswordsChange,
    isMatchingPassword,
    showPassword,
    handleSubmit,
    handleChange,
    passwordType,
    passwordValidityMessage,
    setNewPasswordData,
    handleSubmitForChangePassword,
    handleEmailVerification,
    newPasswordData,
   handleLoginChange,
   handleLoginClient,
   handleLoginAdmin,
   handleLoginSuperAdmin
  }


  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
