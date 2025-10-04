"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const authController = new authController_1.AuthController();
const router = (0, express_1.Router)();
// Public routes
router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/login/account-holder", authController.loginAccountHolder);
router.post("/refresh-token", authController.refreshToken);
router.post("/verify-email", authController.verifyEmail);
router.post("/generate-new-code", authController.resendCode);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
// Protected routes (need middleware to add req.user)
router.get("/me", auth_1.authenticateToken, authController.getMe);
exports.default = router;
