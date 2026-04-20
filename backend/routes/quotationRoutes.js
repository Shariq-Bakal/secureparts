import express from "express";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";
import { submitQuotation, getCustomerQuotations } from "../controllers/quotation/quotationController.js";

const router = express.Router();

router.post("/submitquotation/:rfqId",verifyAccessToken,submitQuotation)
router.get("/customer-quotations",verifyAccessToken,getCustomerQuotations)
export default router