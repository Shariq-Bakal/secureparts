import express from "express";
import { createRFQ, getOpenRFQ } from "../controllers/rfq/rfqController.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/create",verifyAccessToken,createRFQ);
router.get("/pendingrfq/vendor",verifyAccessToken,getOpenRFQ)
export default router;