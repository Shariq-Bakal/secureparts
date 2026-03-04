// Import jsonwebtoken to verify access token
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

// Auth Middleware
export const verifyAccessToken= async (req, res, next) => {

    // Get Authorization header from frontend
    // Format: Authorization: Bearer ACCESS_TOKEN
    const authHeader = req.headers.authorization;

    // If no header is present
    if (!authHeader) {
        return res.status(401).json({
            message: "No Token Provided"
        });
    }

    // Extract token from Bearer TOKEN
    const token = authHeader.split(" ")[1];

    try {
        // Verify ACCESS TOKEN using ACCESS_TOKEN_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        console.log(user,"User")

        // decoded now contains:
        // { id: "...", role: "admin" }

        // Attach FULL decoded object to req.admin
        // So controller can access both id & role
        req.user = user;

        // Move to next controller
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or Expired Token"
        });
    }
};



export const verifyRole = (requiredRole) => {

   return (req, res, next) => {

      if (req.user.role !== requiredRole) {
         return res.status(403).json({
            message: `Access Denied: ${requiredRole} Only`
         });
      }

      next();
   };

};

export const verifyApprovedVendor = (req, res, next) => {

    if (req.user.role !== "vendor") {
        return res.status(403).json({
            message: "Access Denied: Vendors Only"
        });
    }

    if (req.user.vendorStatus !== "approved") {
        return res.status(403).json({
            message: "Vendor Not Approved Yet"
        });
    }

    next();
};