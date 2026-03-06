import User from "../../models/UserModel.js";
import RFQ from "../../models/RFQModel.js";
import Quotation from "../../models/QuotationModel.js";
export const getPendingVendors = async (req, res) => {
    try {

        const vendors = await User.find({
            role: "vendor",
            vendorStatus: "pending"
        }).select("-password");

        res.status(200).json({
            success: true,
            message: "Pending Vendors fetched",
            data: vendors
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching vendors",
            error: error.message
        });
    }
};

export const approveVendor = async (req, res) => {
    try {

        const { id } = req.params;

        const vendor = await User.findByIdAndUpdate(
            id,
            {
                vendorStatus: "approved",
                isApproved: true
            },
            { new: true }
        );

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Vendor Approved Successfully",
            data: vendor
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error approving vendor",
            error: error.message
        });
    }
};

export const rejectVendor = async(req,res)=>{
     try {
        if (req.user.role !== "admin") {
            console.log("❌ Unauthorized Access Attempt");
            return res.status(403).json({
                success: false,
                message: "Only Admin can reject vendors"
            });
        }

        const { id } = req.params;

        const vendor = await User.findByIdAndUpdate(
            id,
            {
                vendorStatus: "rejected",
                isApproved: false
            },
            { new: true }
        );

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Vendor Rejected Successfully",
            data: vendor
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error rejecting vendor",
            error: error.message
        });
    }
    
} 
export const getDashboardStats = async (req, res) => {
    try {

        const [
            totalUsers,
            totalRFQs,
            totalQuotations,
            acceptedQuotations
        ] = await Promise.all([
            User.countDocuments(),
            RFQ.countDocuments(),
            Quotation.countDocuments(),
            Quotation.countDocuments({ status: "accepted" })
        ]); //more efficient way
//         Promise.all result
//         ↓
// [120, 35, 78, 12]
//   ↓    ↓    ↓    ↓
// users rfqs quotes accepted

        const data = {
            totalUsers,
            totalRFQs,
            totalQuotations,
            acceptedQuotations
        };

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// export const getDashboardStats = async (req,res)=>{
//     try{
//         const totalUsers = await User.countDocuments();
//         const totalRFQs= await RFQ.countDocuments();
//         const totalQuotations = await Quotation.countDocuments();
//         const acceptedQuotations = await Quotation.countDocuments({status:"accepted"});
//         const data = {
//             totalUsers: totalUsers,
//             totalRFQs: totalRFQs,
//             totalQuotations: totalQuotations,
//             acceptedQuotations:acceptedQuotations
//         }
//         res.status(200).json(data)
//     }
//     catch(error){
//         console.log(error.message);
//         return res.status(500).json({
//             success:false,
//             message:"Internal server error"
//         })
//     }
// }

//pending things to build GET /admin/recent-rfqs
// GET /admin/recent-quotations
// GET /admin/users
// GET /admin/rfqs
// GET /admin/quotations

export const getRecentRFQS = async (req,res)=>{
    try{
        const limit = Number(req.query.limit)
        if(limit>10){
            return res.status(400).json({
                success:false,
                message:"Limit should less than 11"
            })
        }
        const page = Number(req.query.page)
        if(Number.isNaN(page) || Number.isNaN(limit)){
            return res.status(401).json({
                success:false,
                message:"Please add page and limit"
            })
        }
        const skip = (page - 1) * limit

        const recentRFQS = await RFQ.find().sort({createdAt:-1}).skip(skip).limit(limit)
        res.status(200).json({
            success:true,
            recentRFQS
        })   
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
}
export const getRecentQuotations = async (req,res)=>{
    try{
        const recentQuotations = await Quotation.find().sort({createdAt:-1}).limit(5);
        return res.status(200).json({
            success:true,
            recentQuotations
        })

    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
}
export const getAllUsers = async (req,res)=>{
    try{
        const users = await User.find().limit(10);
        res.status(200).json({
            success:true,
            users
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
}


export const getAllRFQS = async (req,res)=>{
    try{
        const rfqs = await RFQ.find().limit(10);
        res.status(200).json({
            success:true,
            rfqs
        })

    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
}

export const getAllQuotations = async (req,res)=>{
    try{
        const quotations = await Quotation.find().limit(10);
        res.status(200).json({
            success:true,
            quotations
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
}