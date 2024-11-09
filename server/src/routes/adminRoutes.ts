// src/routes/authRoutes.ts
import { Router } from 'express';
import express from 'express';
import {
  registerSuperAdmin,
  verifyEmail,
  loginSuperAdminController,

  updateAdmin,

  changeSuperAdminPasswordController,
  getAllAdmins,
  requestSuperAdminPasswordResetController,
  createAdmin,
} from '../controllers/superAdminController';
import { AdminController } from '../controllers/AdminController';
import { deleteAdminBySuperAdmin } from '../service/SuperAdminService';


const adminRoutes = express.Router();

// SuperAdmin Routes
adminRoutes.post('/superadmin/register', registerSuperAdmin);
adminRoutes.post('/superadmin/verify-email', verifyEmail);
adminRoutes.post('/superadmin/login', loginSuperAdminController);
adminRoutes.post('/superadmin/request-password-change',requestSuperAdminPasswordResetController)
adminRoutes.post('/superadmin/new-password/:id', changeSuperAdminPasswordController);
adminRoutes.post('/admin/create/:superAdminId', createAdmin);

adminRoutes.post('/login', AdminController.login);



adminRoutes.put('/admin/:adminId', updateAdmin);
adminRoutes.get('/:id', getAllAdmins);
adminRoutes.delete('/admin/:adminId', deleteAdminBySuperAdmin);

export default adminRoutes


