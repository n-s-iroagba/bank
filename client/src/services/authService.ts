// authService.ts
interface LoginCredentials {
  email?: string;
  username?: string;
  password: string;
}

interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: any;
  accountHolder?: any;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  // Add other registration fields as needed
}

export class AuthService {
  private static readonly BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private static readonly USER_KEY = 'user_data';

  // Login method that handles both email and username
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data: LoginResponse = await response.json();
      
      // Store authentication data
      this.storeAuthData(data);
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Register method
  static async register(userData: RegisterData): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data: LoginResponse = await response.json();
      
      // Store authentication data
      this.storeAuthData(data);
      
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Get current user
  static async getCurrentUser(): Promise<any> {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${this.BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.clearAuthData();
          throw new Error('Authentication expired');
        }
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }

  // Get account holder profile
  static async getAccountHolderProfile(): Promise<any> {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${this.BASE_URL}/auth/account-holder`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.clearAuthData();
          throw new Error('Authentication expired');
        }
        throw new Error('Failed to fetch account holder data');
      }

      const accountHolderData = await response.json();
      return accountHolderData;
    } catch (error) {
      console.error('Get account holder error:', error);
      throw error;
    }
  }

  // Verify token
  static async verifyToken(): Promise<boolean> {
    try {
      const token = this.getToken();
      if (!token) {
        return false;
      }

      const response = await fetch(`${this.BASE_URL}/auth/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  }

  // Refresh token
  static async refreshToken(): Promise<string> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }

      const response = await fetch(`${this.BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        this.clearAuthData();
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      
      // Update stored tokens
      localStorage.setItem(this.TOKEN_KEY, data.token);
      if (data.refreshToken) {
        localStorage.setItem(this.REFRESH_TOKEN_KEY, data.refreshToken);
      }
      
      return data.token;
    } catch (error) {
      console.error('Refresh token error:', error);
      throw error;
    }
  }

  // Logout
  static async logout(): Promise<void> {
    try {
      const token = this.getToken();
      if (token) {
        await fetch(`${this.BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuthData();
    }
  }

  // Initialize auth state from localStorage
  static initializeAuthState(): { isAuthenticated: boolean; user: any } {
    const token = this.getToken();
    const userData = this.getUserData();
    
    return {
      isAuthenticated: !!token,
      user: userData,
    };
  }

  // Check if user is admin
  static isAdmin(): boolean {
    const userData = this.getUserData();
    return userData?.role === 'admin' || userData?.isAdmin || false;
  }

  // Check if user is account holder
  static isAccountHolder(): boolean {
    const userData = this.getUserData();
    return userData?.role === 'account_holder' || userData?.isAccountHolder || false;
  }

  // Helper methods
  private static storeAuthData(data: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, data.token);
    if (data.refreshToken) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, data.refreshToken);
    }
    localStorage.setItem(this.USER_KEY, JSON.stringify(data.user));
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  private static getUserData(): any {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  static clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}