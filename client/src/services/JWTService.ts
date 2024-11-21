import  { JwtPayload } from 'jwt-decode';
import { jwtDecode } from "jwt-decode";

export class JWTService {

  static saveLoginToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  static getLoginToken(): string | null {
    const key = 'authToken'
    const value = localStorage.getItem(key);
      if (value === null) {
        throw new Error(`Item with key ${key} is missing in localStorage.`);
      }
      return value;
  }

 
  static removeLoginToken(): void {
    localStorage.removeItem('authToken');
  }


  static saveEmailVerificationToken(token: string): void {
    localStorage.setItem('emailVerificationToken', token);
  }

  static getEmailVerificationToken(): string  {
    const key = 'emailVerificationToken'
  const value = localStorage.getItem(key);
    if (value === null) {
      throw new Error(`Item with key ${key} is missing in localStorage.`);
    }
    return value;
  }

 
  static removeEmailVerificationToken(): void {
    localStorage.removeItem('emailVerificationToken');
  }


  static decodeToken<T>(token: string): T {
    try {
      const decoded = jwtDecode<T>(token);
      return decoded;
    } catch (error: any) {
      console.error("Invalid token:", error);
      throw new Error("Failed to decode token");
    }
  }
  

  static isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken<JwtPayload>(token);
    if (!decoded || !decoded.exp) {
      return true; // Consider invalid or missing expiry as expired
    }
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp < currentTime;
  }



}
