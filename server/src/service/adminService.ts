// /src/services/adminService.ts
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { Admin } from '../models/Admin';
import { sendVerificationEmail, sendResetPasswordEmail } from './mailService';

export const createAdmin = async (username: string, password: string, email: string) => {
  const existingAdmin = await Admin.findOne({ where: { username } });
  if (existingAdmin) {
    throw new Error('Admin already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = await Admin.create({
    username,
    password: hashedPassword,
    email,
    isVerified: false,
  });

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  sendVerificationEmail(email, verificationCode);

  return newAdmin;
};

export const verifyAdminEmail = async (username: string, code: string) => {
  const admin = await Admin.findOne({ where: { username } });
  if (!admin) {
    throw new Error('Invalid admin');
  }

  if (code === '123456') { // Mocked for example purposes
    admin.isVerified = true;
    await admin.save();
  } else {
    throw new Error('Invalid verification code');
  }
};

export const loginAdmin = async (username: string, password: string) => {
  const admin = await Admin.findOne({ where: { username } });
  if (!admin || !admin.isVerified) {
    throw new Error('Invalid username or password');
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new Error('Invalid username or password');
  }

  return admin;
};

export const requestPasswordReset = async (email: string) => {
  const admin = await Admin.findOne({ where: { email } });
  if (!admin) {
    throw new Error('Admin not found');
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  sendResetPasswordEmail(email, resetCode);
  // Store the reset code if necessary
};

export const resetAdminPassword = async (email: string, newPassword: string, resetCode: string) => {
  const admin = await Admin.findOne({ where: { email } });
  if (!admin) {
    throw new Error('Admin not found');
  }

  if (resetCode !== '123456') { // Mocked for example purposes
    throw new Error('Invalid reset code');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  admin.password = hashedPassword;
  await admin.save();
};
