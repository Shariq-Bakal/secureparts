import express from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser
} from "../controllers/auth/authController.js"

import { verifyAccessToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);

// Protected Route
router.post("/logout", verifyAccessToken, logoutUser); //its protected only loggedin Users can access this

export default router;