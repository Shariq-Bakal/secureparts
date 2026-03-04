//contains business logic
//decides what to do

import * as userRepository  from "../repositories/userRepository.js";

export const getAllUsers = async () => {
   const users = await userRepository.findAllUsers();
   return users;
};

export const getPendingVendors = async ()=>{
   const vendors = await userRepository.findPendingVendors()
}