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


//getAllQuotations for admin 

export const getAllQuotations = async (req, res) => {
    try {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);

        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only admin can check all quotaions"
            });
        }

        if (Number.isNaN(page) || Number.isNaN(limit)) {
            return res.status(400).json({
                success: false,
                message: "Please enter valid page number and limit"
            });
        }

        if (limit < 1 || limit > 10) {
            return res.status(400).json({
                success: false,
                message: "Limit should be between 1 to 10"
            });
        }

        if (page < 1) {
            return res.status(400).json({
                success: false,
                message: "Page number must be greater than 0"
            });
        }

        const skip = (page - 1) * limit;

        const quotations = await Quotation.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        if (!quotations || quotations.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Currently there are no quotations"
            });
        }

        return res.status(200).json({
            success: true,
            quotations
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

//get quotaion for customers so that they can accept or reject

export const getCustomerQuotations = async (req, res) => {
    try {
        console.log("Customer quotations")
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);

        if (req.user.role !== "customer") {
            return res.status(403).json({
                success: false,
                message: "Only customer can check their quotaions"
            });
        }

        if (Number.isNaN(page) || Number.isNaN(limit)) {
            return res.status(400).json({
                success: false,
                message: "Please enter valid page number and limit"
            });
        }

        if (limit < 1 || limit > 10) {
            return res.status(400).json({
                success: false,
                message: "Limit should be between 1 to 10"
            });
        }

        if (page < 1) {
            return res.status(400).json({
                success: false,
                message: "Page number must be greater than 0"
            });
        }

        const skip = (page - 1) * limit;
        //Get RFQs of this customer
        const rfqs = await RFQ.find({ createdBy: req.user.id }).select("_id");
        const rfqIds = rfqs.map(rfq => rfq._id);

        const quotations = await Quotation.find({ rfq: { $in: rfqIds } }) //“Give me quotations where rfq matches ANY of these IDs”
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("rfq") // optional (very useful for frontend)
    .lean();

        if (!quotations || quotations.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Currently there are no quotations"
            });
        }

        return res.status(200).json({
            success: true,
            quotations
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
//vendor quotations 


export const getVendorQuotations = async (req, res) => {
    try {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);

        if (req.user.role !== "vendor") {
            return res.status(403).json({
                success: false,
                message: "Only vendor can check their quotaions"
            });
        }

        if (Number.isNaN(page) || Number.isNaN(limit)) {
            return res.status(400).json({
                success: false,
                message: "Please enter valid page number and limit"
            });
        }

        if (limit < 1 || limit > 10) {
            return res.status(400).json({
                success: false,
                message: "Limit should be between 1 to 10"
            });
        }

        if (page < 1) {
            return res.status(400).json({
                success: false,
                message: "Page number must be greater than 0"
            });
        }

        const skip = (page - 1) * limit;
        const quotations = await Quotation.find({vendor:req.user.id}) //“Give me quotations where rfq matches ANY of these IDs”
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("rfq") // optional (very useful for frontend)
    .lean();

        if (quotations.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Currently there are no quotations"
            });
        }

        return res.status(200).json({
            success: true,
            quotations
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
