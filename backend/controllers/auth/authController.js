import User from "../../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../../utils/generateToken.js";
import { notifyAdmin } from "../../websocket/wsServer.js";

export const registerUser = async (req,res)=>{
    try{
        const {name,email,password,role} = req.body;
        const SELF_REGISTER_ROLES = ["customer", "vendor"];
        const safeRole = SELF_REGISTER_ROLES.includes(role) ? role : "customer";

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exits"});
        }
        const user = await User.create({ name, email, password, role: safeRole })
        notifyAdmin({
            type: "NEW_USER",
            message: role === "vendor" 
        ? "Vendor registered. Please approve them." 
        : "Customer registered."
        });
        res.status(201).json({
            user:user,
            message:"User created successfully"
        })
    }
    catch(err){
        console.log(err.message);
        res.status(500).json("Error in registering User")
    }
}
export const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({ message: "All fields required" });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                message:"Invalid password"
            });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();
        // 1. Set the Refresh Token in an httpOnly cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // JavaScript cannot read this
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            sameSite: 'strict', // Protects against CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
        });
        let responseUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        if (user.role === "vendor") {
            responseUser.vendorStatus = user.vendorStatus;
            responseUser.isApproved = user.isApproved;
        }

        res.status(200).json({
            success:true,
            accessToken,
            message:"LOGIN SUCCESSFULLY",
            user:responseUser
        });

    }
    catch(err){
        console.log(err.message);
        res.status(500).json({
            message:"INTERNAL SERVER ERROR"
        });
    }
};


//Handles:

// ✔ Register
// ✔ Login
// ✔ Logout
// ✔ Refresh Token

// (common for both admin + user) 

//Goal: Remove refresh token so the user cannot generate new access tokens anymore.

// export const logoutUser = async (req, res) => {
//     try {
//         // const { refreshToken } = req.body;
//         // console.log(refreshToken,"Refresh token")
//         const refreshToken = req.cookies?.refreshToken;

//         // 1. If no token is sent, don't throw an error. Tell the frontend to proceed.
//         if (!refreshToken) {
//             return res.status(200).json({ message: "No token provided, logged out successfully" });
//         }
        

//         // 2. Find user with this refresh token
//         const user = await User.findOne({ refreshToken });

//         // 3. If user isn't found (e.g., token already deleted or invalid), 
//         // still return success so the frontend clears its local storage.
//         if (!user) {
//             return res.status(200).json({ message: "Logged out successfully" });
//         }

//         // 4. Remove refresh token from DB
//         user.refreshToken = null; 
//         // Note: If you want to allow logins on multiple devices later, 
//         // change this to an array filter: user.refreshTokens = user.refreshTokens.filter(t => t !== refreshToken);
        
//         await user.save();

//         return res.status(200).json({ message: "Logout successful" });
        
//     } catch (err) {
//         console.error("Logout Error:", err.message);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

export const logoutUser = async (req, res) => {
    try {
        // 1. Grab the token directly from the cookie
        const refreshToken = req.cookies?.refreshToken;

        // 2. Standardize the cookie clearing options
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        };

        // 3. If no token is provided, just clear cookies and exit gracefully
        if (!refreshToken) {
            res.clearCookie("refreshToken", cookieOptions);
            return res.status(200).json({ message: "No token provided, logged out successfully" });
        }

        // 4. Find user with this token
        const user = await User.findOne({ refreshToken });

        // 5. If user isn't found (token already deleted), still clear cookie
        if (!user) {
            res.clearCookie("refreshToken", cookieOptions);
            return res.status(200).json({ message: "Logged out successfully" });
        }

        // 6. Remove refresh token from DB
        user.refreshToken = null;
        await user.save();

        // 7. Clear the cookie in the browser
        res.clearCookie("refreshToken", cookieOptions);

        return res.status(200).json({ message: "Finally Logout successful" });
        
    } catch (err) {
        console.error("Logout Error:", err.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};
// Goal: When access token expires, user can get a new access token using refresh token, without logging in again.

export const refreshToken = async (req, res) => {
    try {
        const { token } = req.body; // refresh token from frontend;
        if (!token) return res.status(400).json({ message: "Refresh token required" });

        // Find user with this refresh token
        const user = await User.findOne({ refreshToken: token });
        if (!user) return res.status(400).json({ message: "Invalid refresh token" });

        // Verify refresh token
        jwt.verify(token, process.env.REFRESH_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Invalid refresh token" });

            // Generate new access token
            const accessToken = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "15m" }
            );

            res.status(200).json({ accessToken });
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};