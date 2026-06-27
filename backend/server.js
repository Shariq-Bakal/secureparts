import dotenv from "dotenv";
dotenv.config();
import express from "express";

import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import morgan from "morgan"; // Useful for production logging
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import rfqRoutes from "./routes/rfqRoutes.js";
import quotationRoutes from "./routes/quotationRoutes.js";


const app = express();
const port = process.env.PORT || 5000;

// 1. TOP-LEVEL MIDDLEWARE (Security & Logging)
app.use(helmet());
app.use(morgan("dev")); // Logs every request to the terminal so you know what's happening

// Tighten CORS for production
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Only allow your frontend
    credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { message: "Too many requests, please try again after 15 minutes." }
});
app.use("/api/", limiter);

app.use(express.json({ limit: "10kb" })); // Security: Prevent giant JSON attacks
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// 2. DATABASE
connectDB();

// 3. ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/rfq", rfqRoutes);
app.use("/api/quotations", quotationRoutes);

// 4. 404 HANDLER (For routes that don't exist)
app.use((req, res, next) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// 5. GLOBAL ERROR HANDLER (The Safety Net)
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        // Only show stack trace in development mode
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// 6. START SERVER
app.listen(port, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${port}`);
});