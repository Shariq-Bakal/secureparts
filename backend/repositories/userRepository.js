//only jog talk to db

import User from "../models/UserModel.js";
export const findAllUsers =  ()=> {
    return User.find();
}
export const findPendingVendors = ()=>{
    return User.find({
            role: "vendor",
            vendorStatus: "pending"
        }).select("-password");
}