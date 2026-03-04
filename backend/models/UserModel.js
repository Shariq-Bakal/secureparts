import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// STEP 1: Create Schema (Structure of User Data)
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["vendor", "admin", "customer"], // Roles for RBAC
        default: "customer",                       // Default is normal user
    },
    refreshToken: {
        type: String
    },
    vendorStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: function () {
        return this.role === "vendor" ? "pending" : "approved";
    }
},
    isApproved:{
        type:Boolean,
        default: function (){
            return this.role === "vendor"? false :true //So vendor cannot quote until admin approves
        }
    }
    
}, {
    timestamps: true
});


// STEP 2: PRE-SAVE FUNCTION
// Hash password automatically before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return; // Skip if password not changed
    console.log(this.isModified("password"),"THIS")
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


// STEP 3: Compare Password (Helper Function)
// Makes it easier to compare password in controllers
// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };


// STEP 4: Create Model
const User = mongoose.model("User", userSchema);


// STEP 5: Export Model
export default User;