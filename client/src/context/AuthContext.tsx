import {
  ReactNode,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  FormEvent,
  createContext,
} from "react";
import { mockAuthContext } from "./dummyContext";
import {
  loginAdmin,
  loginAccountHolder,
  forgotPassword,
  resetPassword,
} from "../services/authService";
import { createSuperAdmin } from "../services/superAdminService";
import {
  AuthContextType,
  SuperAdminData,
  NewPasswordInput,
  LoginData,
  ForgotPassword,
} from "../types/AuthContextType";
import { doPasswordsMatch } from "../utils/utils";
import { JWTService } from "../services/JWTService";

export const AuthContext = createContext<AuthContextType>(mockAuthContext);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [passwordValidityMessage, setPasswordValidityMessage] = useState<
    string[]
  >([]);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isMatchingPassword, setIsMatchingPassword] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  const [superAdminData, setSuperAdminData] = useState<SuperAdminData>({
    firstName: "",
    surname: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    secretCode: "",
  });

  const [newPasswordInput, setNewPasswordInput] = useState<NewPasswordInput>({
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState<LoginData>({
    password: "",
    username: "",
  });

  const [forgotPasswordInput, setForgotPasswordInput] =
    useState<ForgotPassword>({
      email: "",
    });

  // Helper function to validate password and set validation messages
  const validatePassword = (password: string) => {
    const tempPasswordState: string[] = [];
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const length = password.length;

    if (!hasNumber) tempPasswordState.push("password must contain a number.");
    if (!hasUppercase)
      tempPasswordState.push("password must contain an uppercase letter.");
    if (!hasLowercase)
      tempPasswordState.push("password must contain a lowercase letter.");
    if (length < 8)
      tempPasswordState.push("password must be at least 8 characters.");

    setPasswordValidityMessage(tempPasswordState);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: Dispatch<
      SetStateAction<
        | SuperAdminData
        | NewPasswordInput
        | LoginData
        | ForgotPassword
      >
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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    data: SuperAdminData | NewPasswordInput,
    setState: Dispatch<SetStateAction<any>>
  ) => {
    handleChange(e, setState);

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
    setValidated(true);
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
     JWTService.saveEmailVerificationToken( await createSuperAdmin(superAdminData));
      navigate("/verify-email");
    } catch (error: any) {
      console.error(error);
      if (error.status === 409) {
        setErrorMessage("This email is already registered.");
      } else {
        setErrorMessage(
          "Something went wrong, please try again later or contact the developer."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  //ADMIN
  const handleLoginAdmin = async (
    event: FormEvent<HTMLFormElement>,
    navigate: (path: string) => void,
    isSuperAdmin: boolean = false
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
      localStorage.setItem("loginToken", await loginAdmin(loginData));
      isSuperAdmin
        ? navigate("/super-admin/dashboard")
        : navigate("/admin/dashboard");
    } catch (error: any) {
      setErrorMessage("Sorry we can not log you in at this moment");
      console.error(error);
    } finally {
      setSubmitting(false);
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
      localStorage.setItem("loginToken", await loginAccountHolder(loginData));
    } catch (error: any) {
      setErrorMessage("Sorry we can not log you in at this moment");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  //PASSWORD CHANGE
  const handleForgotPassword = async (
    event: FormEvent<HTMLFormElement>,
    navigate: (path: string) => void
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setErrorMessage("Kindly enter your email.");
      return;
    }
    setSubmitting(true);

    try {
 
        await forgotPassword(forgotPasswordInput)
    
      navigate("/email-sent");
    } catch (error: any) {
      setErrorMessage(
        "sorry you request cannot be completed, contact your developer"
      );
      console.error(error);
    }
  };

  const handleResetPassword = async (
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

    const token = localStorage.getItem("bankChangePasswordToken");
    if (!token) {
      setErrorMessage("You are not authorized to make this request");
      return;
    }
    const id = JWTService.decodeToken<{ id: number }>(token).id;
    if (!id) {
      alert("not authorized");

      return;
    }
    setSubmitting(true);
    try {
      localStorage.setItem(
        "AuthBankToken",
        await resetPassword(id, newPasswordInput)
      );
      alert('password changed successfully')
      navigate("/superadmin/dashboard");
    } catch (error: any) {
      console.error(error)
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
    newPasswordInput,
    forgotPasswordInput,
    handleChangeForConfirmPassword,
    handleSubmit,
    handleChange,
    showPassword,
    handleLoginAccountHolder,
    handleLoginAdmin,
    handleForgotPassword,
    setNewPasswordInput,
    setForgotPasswordInput,
    setErrorMessage,
    setLoginData,
    setSuperAdminData,
    setValidated,
    handleResetPassword
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
