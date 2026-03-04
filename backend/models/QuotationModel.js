import mongoose, { mongo } from "mongoose";

const quotationSchema = new mongoose.Schema({
    rfq:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RFQ",
        required:true
    },
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    deliveryTime:{
        type:Number,
        required:true
    },
    message:{
        type:String
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending"
    }
},{timestamps:true})

const Quotation = mongoose.model("Quotation",quotationSchema);
export default Quotation;