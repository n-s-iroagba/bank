import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { authenticateToken } from "../middleware/auth";
const authController = new AuthController()

const router = Router();

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
router.get("/me", authenticateToken, authController.getMe);


export default router;
