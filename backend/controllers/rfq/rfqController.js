import RFQ from "../../models/RFQModel.js";
import mongoose from "mongoose";

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
//My rfqs
export const getMyRfqs = async (req, res) => {
  try {
    // Default values
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    console.log("PAGE:", req.query.page);
    console.log("LIMIT:", req.query.limit);

    // Validation
    if (Number.isNaN(page) || Number.isNaN(limit)) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid page and limit",
      });
    }

    if (limit < 1 || limit > 10) {
      return res.status(400).json({
        success: false,
        message: "Limit must be between 1 and 10",
      });
    }

    if (page < 1) {
      return res.status(400).json({
        success: false,
        message: "Page number must be greater than 0",
      });
    }

    // Role check
    if (req.user.role !== "customer") {
      return res.status(403).json({
        success: false,
        message: "Only customers can check their RFQs",
      });
    }

    const skip = (page - 1) * limit;


    // Fetch data
    //conveting users string id to mongodb id

    const customerObjectId = new mongoose.Types.ObjectId(req.user._id);

    const rfqs = await RFQ.aggregate([
      // STAGE 1: Match (Find only the RFQs created by this customer)
      { 
        $match: { createdBy: customerObjectId } 
      },

      // STAGE 2: Sort and Paginate (Replicating your exact previous logic)
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },

      // STAGE 3: The Join (Go get the quotes)
      // "Look inside the 'quotations' collection. Find any quotes where the 'rfq' field matches this RFQ's '_id'."
      {
        $lookup: {
          from: "quotations",       // Must be the exact name of your MongoDB collection (usually lowercase plural)
          localField: "_id",        // The ID of the RFQ we are looking at
          foreignField: "rfq",      // The field in the Quotation model that points back to the RFQ
          as: "allQuotations"       // Temporarily shove all those found quotes into an array called 'allQuotations'
        }
      },

      // STAGE 4: Do the Math
      // Create a brand new field on the fly called 'totalQuotes'
      {
        $addFields: {
          // The total quotes is simply the length ($size) of the array we just created
          totalQuotes: { $size: "$allQuotations" } 
        }
      },

      // STAGE 5: Clean Up
      // We don't want to send the massive array of quotes to the customer's dashboard, 
      // we only needed it to count them. So, we remove the array before sending.
      {
        $project: {
          allQuotations: 0 // '0' means hide this field
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      page,
      limit,
      rfqs,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getOpenRFQ = async (req, res) => {
  console.log(req.user, "USER")

  try {
    // ✅ Default page = 1 if not provided
    const page = Number(req.query.page) || 1
    const limit = 10

    // ✅ Validate page
    if (page < 1) {
      return res.status(400).json({
        success: false,
        message: "Page number should be greater than 0"
      })
    }

    // ✅ Check vendor + approval
    if (req.user.role !== "vendor" || req.user.isApproved !== true) {
      return res.status(403).json({
        success: false,
        message: "Only approved vendors can check RFQs"
      })
    }

    const skip = (page - 1) * limit

    // ✅ Run queries in parallel (optimized)
    const [openRfqs, total] = await Promise.all([
      RFQ.find({ status: "open" }) // ✅ filter applied
        .populate("createdBy", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      RFQ.countDocuments({ status: "open" }) // ✅ FIXED (only open RFQs)
    ])

    const totalPages = Math.ceil(total / limit)

    // ✅ No data case (still success)
    if (openRfqs.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No RFQs available",
        data: [],
        pagination: {
          totalRecords: 0,
          totalPages: 0,
          currentPage: page,
          limit
        }
      })
    }

    // ✅ Final response
    return res.status(200).json({
      success: true,
      data: openRfqs,
      pagination: {
        totalRecords: total,
        totalPages,
        currentPage: page,
        limit
      }
    })

  } catch (error) {
    console.log("❌ Internal error:", error.message)

    return res.status(500).json({
      success: false,
      message: "Server Error"
    })
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

//get rfq details 
export const getRfqDetails = async(req,res)=>{
  try{
    if (!["admin", "vendor"].includes(req.user.role) || req.user.role === "vendor" && !req.user.isApproved) {
  return res.status(403).json({
    success: false,
    message: "Only approved vendors or admin can check RFQs"
  });
}
    
    const {id} = req.params;
    console.log("req.user:", req.user);
    console.log("role:", req.user?.role);
    console.log("isApproved:", req.user?.isApproved);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid RFQ ID",
      });
    }
    const rfqDetails = await RFQ.findById(id)
    if (!rfqDetails) {
      return res.status(404).json({
        success: false,
        message: "RFQ not found",
      });
    }
    res.status(200).json({
      success:true,
      rfqDetails
    })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
}

//getcustomerrfq details

export const getCustomerRfqDetails = async(req,res)=>{
  try{
    if (req.user.role !== "customer") {
  return res.status(403).json({
    success: false,
    message: "Only customers or admin can check RFQs"
  });
}
    
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid RFQ ID",
      });
    }
    const customerRfqDetails = await RFQ.findOne({
  _id: id,
  createdBy: req.user._id
});
    if (!customerRfqDetails) {
      return res.status(404).json({
        success: false,
        message: "RFQ not found",
      });
    }
    res.status(200).json({
      success:true,
      customerRfqDetails
    })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
}