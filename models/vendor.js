import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    billingaddress:{
        type:String
    },
    companyName:{
        type:String
    },
    contactPerson:{
        type:String
    },
    designation:{
        type:String,
    },
    email:{
        type:String,
    },
    institute:{
        type:String,
    },
    formationDate:{
        type:String,
    },
    organizationStatus:{
        type: String,
    enum: ["Shipped", "Processing", "Delivered", "Cancelled"],
    default: "Processing",
    },
    mobileNumber:{
        type:String,
    },
    officeNumber:{
        type:String,
    },
    panNumber:{
        type:String,
    },
    tanNumber:{
        type:String,
    },
    gstNumber:{
        type:String,
    },
    sign:{
        type:String,
    },
    gst:{
        type:String,
    },
    panCopy:{
        type:String,
    },
    tanCopy:{
        type:String,
    },
    originalCancelCheque:{
        type:String,
    },
    others:{
        type:String,
    },
    registerAddress:{
        type:String,
    },
    vendorName:{
        type:String,
    }
    ,
});

export const Vendors = mongoose.model("Vendors", vendorSchema);

