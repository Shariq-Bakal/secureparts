import express from "express";
import { getProfile } from "../controllers/user/userController.js";
import {verifyAccessToken} from "../middlewares/authMiddleware.js";
import { getAllRfq } from "../controllers/rfq/rfqController.js";

const router = express.Router();

router.get("/profile", verifyAccessToken, getProfile);
router.get("/rfqs",verifyAccessToken,getAllRfq)

export default router;