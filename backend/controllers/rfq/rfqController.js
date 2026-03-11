import RFQ from "../../models/RFQModel.js";

export const createRFQ = async (req,res)=>{
    try{
        if(req.user.role!=="customer"){
            return res.status(403).json({
                success:false,
                message:"Only customer can create rfqs"
            })
        }
         const { partName, quantity, description, category, deadline } = req.body;
         if(!partName || !quantity || !category || !deadline){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
         }
         const rfq = await RFQ.create({
            partName,
            quantity,
            description,
            category,
            deadline,
            createdBy: req.user.id // This comes from JWT MIDDLE WARE
         })
         console.log("✅ RFQ Created by:", req.user.email);

        res.status(201).json({
            success: true,
            message: "RFQ Created Successfully",
            data: rfq
        });
    }
    catch(error){
        console.log("❌ RFQ Creation Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}
export const getOpenRFQ = async(req,res)=>{
    console.log(req.user,"USER")
    try{
        if(req.user.role !== "vendor" || req.user.isApproved !== true){
            return res.status(403).json({
                success:false,
                message:"Only approved vendors can check rfqs"
            })}
        const openRFQS = await RFQ.find({status:"open"}).populate("createdBy","name");
        if(openRFQS.length===0){
            return res.status(200).json({
                success:false,
                message:"No rfqs available"
            })
        }
        res.status(200).json({
            success:true,
            data:openRFQS
        })
        
    }
    catch(error){
        console.log("❌Internal error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}
export const getAllRfq = async (req, res) => {
  try {

    const page = Number(req.query.page);

    if (Number.isNaN(page)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid page number"
      });
    }

    if (page < 1) {
      return res.status(400).json({
        success: false,
        message: "Page number should be greater than 0"
      });
    }

    const limit = 10; // fixed records per page
    const skip = (page - 1) * limit;

    const [rfqs, total] = await Promise.all([
      RFQ.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      RFQ.countDocuments()
    ]);

    const totalPages = Math.ceil(total / limit);
    console.log(rfqs)

    return res.status(200).json({
      success: true,
      data: rfqs,
      pagination: {
        totalRecords: total,
        totalPages: totalPages,
        currentPage: page,
        limit: limit
      }
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }
};