// src/routes/authRoutes.ts
import { Router } from 'express';
import express from 'express';
import { registerSuperAdmin, verifyEmail, loginSuperAdminController, requestSuperAdminPasswordResetController, changeSuperAdminPasswordController } from '../controllers/superAdminController';


const superAdminRoutes = express.Router();

// SuperAdmin Routes
superAdminRoutes.post('/register', registerSuperAdmin);
superAdminRoutes.post('/verify-email', verifyEmail);
superAdminRoutes.post('/login', loginSuperAdminController);
superAdminRoutes.post('/request-change-password',requestSuperAdminPasswordResetController)
superAdminRoutes.post('/new-password/:id', changeSuperAdminPasswordController);




export default superAdminRoutes


