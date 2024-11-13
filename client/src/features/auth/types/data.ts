import { AuthContextType } from "./authTypes";

export const mockAuthContext: AuthContextType = {
    superAdminData: {
     username: "admin",
     firstname: 'John Doe',
     surname:'',
     password:'',
     confirmPassword:'',
      email: 'admin@example.com',
      secretCode:''
    },
    newPasswordData: {
      // Mock data for NewPasswordData properties
      confirmPassword: 'oldPassword123',
      password: 'newPassword123'
    },
    submitting: false,
    errorMessage: '',
    passwordType: 'text',
    passwordValidityMessage: ['Password must be at least 8 characters', 'Password must contain a special character'],
    isMatchingPassword: true,
    loginData: {
      // Mock data for LoginData properties
      username: 'johndoe',
      password: 'password123'
    },
    validated: true,
    superAdminLoginData: {
      // Mock data for SuperAdminLoginData properties
      email: 'superadmin',
      password: 'adminPass123'
    },
    setSuperAdminLoginData: () => {},
    handleRequestPasswordChange: () => {},
    showPassword: () => {},
    setNewPasswordData: () => {},
    setChangePasswordData: () => {},
    setErrorMessage: () => {},
    setLoginData: () => {},
    setSuperAdminData: () => {},
    setValidated: () => {},
    handleChangeForConfirmPassword: () => {},
    handleSubmit: () => {},
    handleChange: () => {},
    handleSubmitForChangePassword: () => {},
    handleLoginSuperAdmin: () => {},
    handleLoginAdmin: () => {},
    handleLoginAccountHolder: () => {},
    handleEmailVerification: () => {}
  };
  