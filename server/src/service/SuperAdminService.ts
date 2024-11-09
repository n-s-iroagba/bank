
import bcrypt from 'bcrypt';

import { Admin } from '../models/Admin';
import { SuperAdmin } from '../models/SuperAdmin';
import { CreateAdmin } from '../types/Admin';
import { TermDepositAccount } from '../models/TermDepositAccount';
import { AccountHolder } from '../models/AccountHolder';
import { CheckingAccount } from '../models/CheckingAccount';
import { Transaction } from '../models/Transaction';


// Create a SuperAdmin
export const createSuperAdmin = async (username: string, password: string, email: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const superAdmin = await SuperAdmin.create({ username, password: hashedPassword, email});
  const admin = await Admin.create({ username, password: hashedPassword, email,superAdminId: superAdmin.id});
  superAdmin.adminIdentification = admin.id;
  await superAdmin.save()
 
  return superAdmin;
};

// Verify SuperAdmin Email
export const verifySuperAdminEmail = async (username: string, code: string) => {
  const superAdmin = await SuperAdmin.findOne({ where: { username, verificationCode: code } });
  if (!superAdmin) {
    throw new Error('Invalid verification code or username');
  }
  superAdmin.isVerified = true;
  await superAdmin.save();
};

// Login SuperAdmin
export const loginSuperAdmin = async (username: string, password: string) => {
  const superAdmin = await SuperAdmin.findOne({ where: { username } });
  if (!superAdmin) {
    throw new Error('SuperAdmin not found');
  }
  const passwordMatch = await bcrypt.compare(password, superAdmin.password);
  if (!passwordMatch) {
    throw new Error('Incorrect password');
  }
  return superAdmin;
};

// Create Admin by SuperAdmin
export const createAdminBySuperAdmin = async (superAdminId: number, username: string, password: string, email: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await Admin.create({ superAdminId, username, password: hashedPassword, email });
  return admin;
};



export const getAdmins = async (id: number) => {
  try {
   // getAdmins function
const admins = await Admin.findAll({
  where: {
    superAdminId: id,
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
export const updateAdminBySuperAdmin = async (adminId: number, updates:CreateAdmin) => {
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
export const deleteAdminBySuperAdmin = async (adminId: number) => {
  const deleted = await Admin.destroy({ where: { id: adminId } });
  if (!deleted) {
    throw new Error('Admin not found');
  }
};

// Change SuperAdmin Password
export const changeSuperAdminPassword = async (superAdminId: number, newPassword: string) => {
  const superAdmin = await SuperAdmin.findByPk(superAdminId);
  if (!superAdmin) {
    throw new Error('SuperAdmin not found');
  }

  superAdmin.password = await bcrypt.hash(newPassword, 10);
  await superAdmin.save();
};

// Request SuperAdmin Password Reset
export const requestSuperAdminPasswordReset = async (email: string) => {
  const superAdmin = await SuperAdmin.findOne({ where: { email } });
  if (!superAdmin) {
    throw new Error('SuperAdmin not found');
  }
  // Implement email sending logic here for password reset link
  // For example, sendResetEmail(superAdmin.email, resetToken);
};
