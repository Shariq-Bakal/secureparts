import mongoose from "mongoose";

const rfqSchema = new mongoose.Schema({

    partName: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    description: {
        type: String
    },

    category: {
        type: String,
        required: true
    },

    deadline: {
        type: Date,
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //This ID belongs to User Model
        required: true // This is document referencing
    },

    status: {
        type: String,
        enum: ["open", "quoted", "closed", "ordered"],
        default: "open"
    }

}, {
    timestamps: true
});

const RFQ = mongoose.model("RFQ", rfqSchema);

export default RFQ;