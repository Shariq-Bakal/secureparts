import mongoose from "mongoose";

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
        required:true,
        min:1
    },
    deliveryTime:{
        type:Number,
        required:true,
        min:1
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
quotationSchema.index({ rfq: 1, vendor: 1 }, { unique: true });
const Quotation = mongoose.model("Quotation",quotationSchema);
export default Quotation;