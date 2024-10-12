// src/routes/authRoutes.ts
import { Router } from 'express';
import express from 'express';
import {
  signUp,
  verifyEmail,
  login,
  requestPasswordReset,
  resetPassword,
} from '../controllers/adminController';

const authRoutes = express.Router();

authRoutes.post('/signup', signUp);
authRoutes.post('/verify-email', verifyEmail);
authRoutes.post('/login', login);
authRoutes.post('/request-password-reset', requestPasswordReset);
authRoutes.post('/reset-password', resetPassword);

export default authRoutes;

