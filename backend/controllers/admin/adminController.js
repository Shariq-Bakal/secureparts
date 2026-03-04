import User from "../../models/UserModel.js";
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

// export const getAllUsers = async(req,res)=>{
//     try{
//         const 
//     }
//     catch(error){
//         res.status(500).json({
//             success: false,
//             message: "Error in fetching users",
//             error: error.message
//         });
//     }
// }