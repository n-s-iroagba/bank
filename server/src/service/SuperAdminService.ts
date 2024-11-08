// /src/services/adminService.ts
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { Admin } from '../models/Admin';
import { SuperAdmin } from '../models/SuperAdmin';
import { CreateAdmin } from '../types/Admin';


// Create a SuperAdmin
export const createSuperAdmin = async (username: string, password: string, email: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await Admin.create({ username, password: hashedPassword, email });
  const superAdmin = await SuperAdmin.create({ username, password: hashedPassword, email,adminIdentification:admin.id });
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

// Get all Admins
export const getAdmins = async () => {
  return await Admin.findAll();
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
