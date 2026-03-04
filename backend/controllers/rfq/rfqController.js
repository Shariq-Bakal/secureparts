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