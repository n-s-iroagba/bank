// services/JWTService.ts
import jwt from 'jsonwebtoken';

const secretKey = 'yourSecretKey'; // Use an environment variable for secretKey

export class JWTService {
  // Function to generate a JWT
  static generateToken(payload: object): string {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
  }

  // Function to verify the JWT token
  static verifyToken(token: string): object | string {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
