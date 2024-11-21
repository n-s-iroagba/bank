// services/AdminService.ts
import bcrypt from 'bcrypt';
import { Admin } from '../models/Admin';
import { JWTService } from './JWTService';
import { Transaction } from '../models/Transaction';
import { AccountHolder } from '../models/AccountHolder';
import { CheckingAccount } from '../models/CheckingAccount';
import { TermDepositAccount } from '../models/TermDepositAccount';
import { UpdateAdmin } from '../types/AdminTypes';


export class AdminService {

static createAdminBySuperAdmin = async (superAdminId: number, username: string, password: string, email: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      superAdminId, username,
      password: hashedPassword,
      email: email
    });
    return admin;
  };
  
  
  
static getAdmins = async (superAdminId: number) => {
    try {
     // getAdmins function
  const admins = await Admin.findAll({
    where: {
      superAdminId: superAdminId,
    },
    include: [
      {
        model: AccountHolder,
        as: 'accountHolders',  // Must match the alias in the association
        include: [
          {
            model: CheckingAccount,
            as: 'checkingAccount',
            include: [
              {
                model: Transaction,
                as: 'transactions',
              },
            ],
          },
          {
            model: TermDepositAccount,
            as: 'termDepositAccount',
          },
        ],
      },
    ],
  });
  
      return admins;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };
  
    
  // Update Admin Details by SuperAdmin
static updateAdminBySuperAdmin = async (adminId: number, updates:UpdateAdmin) => {
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      throw new Error('Admin not found');
    }
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    await admin.update(updates);
    return admin;
  };
  
  // Delete Admin by SuperAdmin
static deleteAdminBySuperAdmin = async (adminId: number) => {
    const deleted = await Admin.destroy({ where: { id: adminId } });
    if (!deleted) {
      throw new Error('Admin not found');
    }
  };
  
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
