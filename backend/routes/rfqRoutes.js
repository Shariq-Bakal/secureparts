import express from "express";
import { createRFQ, getOpenRFQ, getMyRfqs,getAllRfq, getRfqDetails } from "../controllers/rfq/rfqController.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/create",verifyAccessToken,createRFQ);
router.get("/my-rfqs",verifyAccessToken,getMyRfqs);
router.get("/openrfqs",verifyAccessToken,getOpenRFQ)
router.get("/openrfqs/:id",verifyAccessToken,getRfqDetails)
router.get("/user/rfqs",verifyAccessToken,getAllRfq)


export default router;