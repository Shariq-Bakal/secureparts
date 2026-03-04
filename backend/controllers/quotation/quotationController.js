import Quotation from "../../models/QuotationModel.js";
import RFQ from "../../models/RFQModel.js";

export const submitQuotation = async (req, res) => {
    try {

        // 🔐 STEP 1: Check Vendor Role & Approval
        if (req.user.role !== "vendor" || req.user.isApproved === false) {
            return res.status(403).json({
                success: false,
                message: "Only approved vendors can submit quotations"
            });
        }

        // 📦 STEP 2: Validate Input
        const { price, deliveryTime, message } = req.body;

        if (!price || !deliveryTime) {
            return res.status(400).json({
                success: false,
                message: "Price and Delivery Time are required"
            });
        }

        // 🆔 STEP 3: Extract RFQ ID from params
        const { rfqId } = req.params;

        // 🔍 STEP 4: Check RFQ Exists
        const rfq = await RFQ.findById(rfqId);

        if (!rfq) {
            return res.status(404).json({
                success: false,
                message: "RFQ not found"
            });
        }

        // ❌ STEP 5: RFQ must be OPEN
        if (rfq.status !== "open") {
            return res.status(400).json({
                success: false,
                message: "RFQ is closed. You cannot quote now."
            });
        }

        // 🔁 STEP 6: Check if Vendor Already Quoted
        const existingQuotation = await Quotation.findOne({
            rfq: rfqId,
            vendor: req.user.id
        });

        // 🛠️ STEP 7A: UPDATE if exists
        if (existingQuotation) {

            existingQuotation.price = price;
            existingQuotation.deliveryTime = deliveryTime;
            existingQuotation.message = message;

            await existingQuotation.save();

            return res.status(200).json({
                success: true,
                message: "Quotation updated successfully",
                data: existingQuotation
            });
        }

        // 🆕 STEP 7B: CREATE if not exists
        const newQuotation = await Quotation.create({
            rfq: rfqId,
            vendor: req.user.id,
            price,
            deliveryTime,
            message
        });

        return res.status(201).json({
            success: true,
            message: "Quotation submitted successfully",
            data: newQuotation
        });

    } catch (error) {
        console.log("❌ Error in submitting quotation:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};