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
  DecodedChangePasswordToken,
  SuperAdminData,
} from "../types/authTypes";
import axiosClient from "../../../api/axiosClient";
import { jwtDecode } from "jwt-decode";
import { loginAdmin } from "../../../services/adminService";
import { loginSuperAdmin } from "../../../services/superAdminService";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [passwordValidityMessage, setPasswordValidityMessage] = useState<
    string[]
  >([]);
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
    username: "",
  });

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
    data: SuperAdminData | NewPasswordData | LoginData,
    e: ChangeEvent<HTMLInputElement>,
    setState: Dispatch<
      SetStateAction<SuperAdminData | NewPasswordData | LoginData>
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

  const handleConfirmPasswordsChange = (
    data: SuperAdminData | NewPasswordData,
    e: ChangeEvent<HTMLInputElement>,
    setState: Dispatch<
      SetStateAction<SuperAdminData | NewPasswordData | LoginData>
    >
  ) => {
    handleChange(data, e, setState);

    if ("password" in data) {
      setIsMatchingPassword(doPasswordsMatch(data.password, e.target.value));
    }
  };

  const showPassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleSubmit = async (
    data: SuperAdminData,
    event: FormEvent<HTMLFormElement>,
    url: string,
    navigate: (path: string) => void
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const secretCodeMatch =
      data.secretCode === process.env.REACT_APP_ADMIN_SECRET_KEY;

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
      const response = await axiosClient.post(url, data);
      if (response.status === 201) {
        handleEmailVerification(response, false, navigate);
      } else if (response.status === 409) {
        setErrorMessage("This email is already registered");
      } else {
        setErrorMessage("Something went wrong, please try again later");
      }
    } catch (error: any) {
      // handleServerError(error, 409, "User with this email already exists");
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
      "EmailVerificationToken",
      JSON.stringify(response.data)
    );
    shouldReload
      ? window.location.reload()
      : navigateToVerifyEmailPage(navigate);
  };

  const navigateToVerifyEmailPage = (navigate: (path: string) => void) => {
    navigate("/verify-email");
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
      const response = await loginSuperAdmin(loginData);
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
      const response = await loginAdmin({ ...loginData });
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
      const response = await axiosClient.post("dummyroute", loginData);
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
  const postChangePasswordData = async (
    url: string,
    data: { password: string }
  ) => {
    return await axiosClient.post(url, data);
  };

  const handleSubmitForChangePassword = async (
    data: NewPasswordData,
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

    const token = localStorage.getItem("ChangePasswordToken");
    const decodedToken = getIdFromChangePasswordToken(token);

    if (!decodedToken || !token) {
      setErrorMessage("You are not authorized to make this request");
      return;
    }

    setSubmitting(true);
    try {
      const response = await postChangePasswordData(
        `${"dummyroute"}/${decodedToken.id}`,
        { password: data.password }
      );
      if (response.status === 200) {
        localStorage.setItem("JwtToken", JSON.stringify(response.data));
        navigate("/super-admin/dashboard");
      }
    } catch (error: any) {
      alert("An error occurred, kindly try again later");
    } finally {
      setSubmitting(false);
    }
  };

  const getIdFromChangePasswordToken = (
    token: string | null
  ): DecodedChangePasswordToken | null => {
    const decodedToken: DecodedChangePasswordToken | null = token
      ? jwtDecode(token)
      : null;
    if (!token || !decodedToken) {
      setErrorMessage("You are not authorized to make this request");
    }
    return decodedToken;
  };

  const authContextValue: AuthContextType = {
    superAdminData,
    submitting,
    loginData,
    errorMessage,
    setErrorMessage,
    validated,
    setValidated,
    handleConfirmPasswordsChange,
    isMatchingPassword,
    handleSubmit,
    handleChange,
    passwordType,
    passwordValidityMessage,
    handleSubmitForChangePassword,
    handleEmailVerification,
    newPasswordData,
    showPassword,
    setSuperAdminData,
    setNewPasswordData,
    setLoginData,
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
