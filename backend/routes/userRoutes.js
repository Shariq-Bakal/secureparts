import express from "express";
import { getProfile } from "../controllers/user/userController.js";
import {verifyAccessToken} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/profile", verifyAccessToken, getProfile);

export default router;