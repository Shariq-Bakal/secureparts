import User from "../../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../../utils/generateToken.js";


export const registerUser = async (req,res)=>{
    try{
        const {name,email,password,role} = req.body;
        console.log("Incoming Role:", role);
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exits"});
        }
        const user = await User.create({
            name,
            email,
            password,
            role
        })
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
            res.status(404).json({message:"All fields required"})
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

export const logoutUser = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) return res.status(400).json({ message: "Refresh token required" });

        // Find user with this refresh token
        const user = await User.findOne({ refreshToken });
        if (!user) return res.status(400).json({ message: "Invalid refresh token" });

        // Remove refresh token from DB
        user.refreshToken = null;
        await user.save();

        res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Goal: When access token expires, user can get a new access token using refresh token, without logging in again.

export const refreshToken = async (req, res) => {
    try {
        const { token } = req.body; // refresh token from frontend
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