// services/AdminService.ts
import bcrypt from 'bcrypt';
import { Admin } from '../models/Admin';
import { JWTService } from './JWTService';

export class AdminService {
  // Login function to authenticate admin and issue JWT
  static async loginAdmin(username: string, password: string) {
    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      throw new Error('Admin not found');
    }

    // Compare the hashed password stored in DB with the password provided by the user
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // If credentials are valid, generate a JWT
    const token = JWTService.generateToken({ id: admin.id, username: admin.username });

    return { token };
  }
}
