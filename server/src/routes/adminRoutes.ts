// src/routes/authRoutes.ts
import { Router } from 'express';
import express from 'express';
import {
  registerSuperAdmin,
  verifyEmail,
  loginSuperAdminController,
  createAdmin,
  loginAdminController,
  updateAdmin,
  deleteAdminController,
  changeSuperAdminPasswordController,
  getAllAdmins,
  requestSuperAdminPasswordResetController,
} from '../controllers/superAdminController';

const adminRoutes = express.Router();

// SuperAdmin Routes
adminRoutes.post('/superadmin/register', registerSuperAdmin);
adminRoutes.post('/superadmin/verify-email', verifyEmail);
adminRoutes.post('/superadmin/login', loginSuperAdminController);
adminRoutes.post('/superadmin/request-password-change',requestSuperAdminPasswordResetController)
adminRoutes.post('/superadmin/new-password/:id', changeSuperAdminPasswordController);



// Admin Routes
adminRoutes.post('/admin/create', createAdmin);
adminRoutes.post('/admin/login', loginAdminController);
adminRoutes.put('/admin/:adminId', updateAdmin);
adminRoutes.get('/all', getAllAdmins);
adminRoutes.delete('/admin/:adminId', deleteAdminController);



export default adminRoutes;


