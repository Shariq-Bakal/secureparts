import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import rfqRoutes from "./routes/rfqRoutes.js"
import quotationRoutes from "./routes/quotationRoutes.js"
const app = express();

dotenv.config();
const port = process.env.PORT || 5000;


// Connect to MongoDB
connectDB();
app.use(express.json()); //Converts data into json

// 🔹 Basic Route
app.use("/api/auth", authRoutes ); //endpoint would be POST http://localhost:5000/api/admin/register
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/rfq",rfqRoutes)
app.use("/api/quotations",quotationRoutes)



app.listen(5000,()=>{
    console.log(`server is running on port ${port}`) //Start my backend server on port 5000
})