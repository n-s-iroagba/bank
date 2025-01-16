
import { AuthContextType} from "../types/AuthContextType";


export const mockAuthContext: AuthContextType = {
  superAdminData: {
    firstName: 'John Doe',
    surname: '',
    password: '',
    username: '',
    confirmPassword: '',
    email: 'admin@example.com',
    secretCode: ''
  },
  newPasswordInput: {
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


  handleForgotPassword: () => { },
  showPassword: () => { },
  setNewPasswordInput: () => { },

  setErrorMessage: () => { },
  setLoginData: () => { },
  setSuperAdminData: () => { },
  setValidated: () => { },
  handleChangeForConfirmPassword: () => { },
  handleSubmit: () => { },
  handleChange: () => { },
  handleResetPassword: () => { },

  handleLoginAdmin: () => { },
  handleLoginAccountHolder: () => { },
  setForgotPasswordInput:()=>{}
};
  