import mongoose from "mongoose";

/**
 * Connects to MongoDB Atlas using Mongoose
 * Logs success or error
 */
const connectDB = async () => {
    try {
        // Connect using environment variable
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process if DB connection fails
    }
};

export default connectDB;
