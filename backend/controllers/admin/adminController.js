import User from "../../models/UserModel.js";
import RFQ from "../../models/RFQModel.js";
import Quotation from "../../models/QuotationModel.js";

export const getPendingVendors = async (req, res) => {
  try {

    const page = Number(req.query.page)
    const limit = Number(req.query.limit)

    if (Number.isNaN(page) || Number.isNaN(limit)) {
      return res.status(400).json({
        success: false,
        message: "Please give valid page number and limit"
      })
    }

    if (page < 1) {
      return res.status(400).json({
        success: false,
        message: "Page should be greater than 0"
      })
    }

    if (limit < 1 || limit > 10) {
      return res.status(400).json({
        success: false,
        message: "Limit should be between 1 to 10"
      })
    }

    const skip = (page - 1) * limit

    // total vendors
    const totalVendors = await User.countDocuments({
      role: "vendor",
      vendorStatus: "pending"
    })

    const totalPages = Math.ceil(totalVendors / limit)

    const vendors = await User.find({
      role: "vendor",
      vendorStatus: "pending"
    })
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    res.status(200).json({
      success: true,
      message: "Pending Vendors fetched",
      page,
      totalPages,
      totalVendors,
      vendors
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error fetching vendors",
      error: error.message
    })

  }
}

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

export const getRecentRFQS = async (req, res) => {
    try {

        const limit = Number(req.query.limit)
        const page = Number(req.query.page)

        // 1️⃣ Check if values exist and are numbers
        if (Number.isNaN(page) || Number.isNaN(limit)) {
            return res.status(400).json({
                success: false,
                message: "Please add valid page and limit"
            })
        }

        // 2️⃣ Limit validation
        if (limit > 10 || limit < 1) {
            return res.status(400).json({
                success: false,
                message: "Limit must be between 1 and 10"
            })
        }

        // 3️⃣ Page validation
        if (page < 1) {
            return res.status(400).json({
                success: false,
                message: "Page must be greater than 0"
            })
        }

        const skip = (page - 1) * limit
        console.log(page)

        const recentRFQS = await RFQ
            .find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("createdBy","name")
            .lean()

        return res.status(200).json({
            success: true,
            data: recentRFQS
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
}

export const getRecentQuotations = async (req,res)=>{
    try{
        const limit = Number(req.query.limit);
        const page = Number(req.query.page);

        if(Number.isNaN(page) || Number.isNaN(limit)){
            return res.status(400).json( {
                success:false,
                message:"Please add valid page number and limit"
            })
        }
        if(page<1){
            return res.status(400).json({
                success:false,
                message:"Page number must be greater than 0"
            })
        }
        if(limit>10 || limit<1){
            return res.status(400).json({
                success:false,
                message:"Limit should be between 1 to 10"
            })
        }
        const skip = (page-1) * limit
        const recentQuotations = await Quotation.find().sort({createdAt:-1}).skip(skip).limit(limit).lean();
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
export const getAllUsers = async (req, res) => {
  try {

    const page = Number(req.query.page)
    const limit = Number(req.query.limit)

    if (Number.isNaN(page) || Number.isNaN(limit)) {
      return res.status(400).json({
        success: false,
        message: "Please send valid page or limit"
      })
    }

    if (page < 1) {
      return res.status(400).json({
        success: false,
        message: "Page must be greater than 0"
      })
    }

    if (limit < 1 || limit > 10) {
      return res.status(400).json({
        success: false,
        message: "Limit must be between 1 to 10"
      })
    }

    const skip = (page - 1) * limit


    // 🔵 Get total users count
    const totalUsers = await User.countDocuments()


    // 🔵 Fetch paginated users
    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()


    // 🔵 Calculate total pages
    const totalPages = Math.ceil(totalUsers / limit)


    res.status(200).json({
      success: true,
      users,
      totalUsers,
      totalPages,
      currentPage: page
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })

  }
}

export const getAllRFQS = async (req, res) => {
    try {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);

        if (Number.isNaN(page) || Number.isNaN(limit)) {
            return res.status(400).json({
                success: false,
                message: "Please send valid page or limit"
            });
        }

        if (page < 1) {
            return res.status(400).json({
                success: false,
                message: "Page must be greater than 0"
            });
        }

        if (limit < 1 || limit > 10) {
            return res.status(400).json({
                success: false,
                message: "Limit must be between 1 to 10"
            });
        }

        const skip = (page - 1) * limit;

        const rfqs = await RFQ.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate("createdBy", "name")
                .lean();

        const totalRFQS = await RFQ.countDocuments();

       return res.status(200).json({
            success: true,
            page,
            limit,
            totalRFQS,
            totalPages: Math.ceil(totalRFQS / limit),
            rfqs
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const getAllQuotations = async (req, res) => {
    try {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);

        if (Number.isNaN(page) || Number.isNaN(limit)) {
            return res.status(400).json({
                success: false,
                message: "Please send valid page or limit"
            });
        }

        if (page < 1) {
            return res.status(400).json({
                success: false,
                message: "Page must be greater than 0"
            });
        }

        if (limit < 1 || limit > 10) {
            return res.status(400).json({
                success: false,
                message: "Limit must be between 1 to 10"
            });
        }

        const skip = (page - 1) * limit;

        const quotations = await Quotation.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const totalQuotations = await Quotation.countDocuments();

        res.status(200).json({
            success: true,
            page,
            limit,
            totalQuotations,
            totalPages: Math.ceil(totalQuotations / limit),
            quotations
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


//Deleting a user

export const deleteUser = async (req, res) => {
    try {

        const id = req.params.id;   // id should come from params

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid user id"
            });
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};