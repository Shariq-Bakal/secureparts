// Handles:

// ✔ Get Profile
// ✔ Update Profile
// ✔ Change Password

// (normal user dashboard features)

import User from "../../models/UserModel.js";

export const getProfile = async (req, res) => {
    try {
        // req.user comes from authMiddleware
        const user = await User.findById(req.user.id).select("-password -refreshToken");
        console.log(user)
        res.status(200).json({ user });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};