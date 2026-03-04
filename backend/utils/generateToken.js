import jwt from "jsonwebtoken";

export const generateAccessToken = (user)=>{
  return jwt.sign(
    {
      id:user._id,
      role:user.role
    },
    process.env.JWT_SECRET,
    { expiresIn:"1h" }
  );
};//STAYS IN FRONTEND AND IS USED TO ACCESS PROTECTED ROUTES

export const generateRefreshToken = (user)=>{
  return jwt.sign(
    {
      id:user._id
    },
    process.env.REFRESH_SECRET,
    { expiresIn:"7d" }
  );
}; //STAYS IN DB AND IS USED TO GENERATE ACCESS TOKEN
