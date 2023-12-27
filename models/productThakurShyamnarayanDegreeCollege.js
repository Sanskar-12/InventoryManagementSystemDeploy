import mongoose from "mongoose";
const productThakurShyamnarayanDegreeCollegesSchema= new mongoose.Schema({
    department: {
      type: String,
    },
    institute: {
      type: String,
    },
    lab: [{LabNo:Number,FloorNo:Number}]
  ,
  productType: {
    type: String,
    enum: ["Supplies", "Equipment"],
    default: "Supplies",
  },
    productType: {
      type: String,
      enum: ["Supplies", "Equipment"],
      default: "Supplies",
    },
    invoice:{
      type:String
    },
  
    items: [
      {
        description: String,
        quantity: Number,
        unitPrice: Number,
        total: Number,
        perInvInf: [
          {
            date: {
              type: Date,
              default: Date.now,
            },
            quantity: Number,
            userId: {
              type: String,
            },
            itemId:String,
          },
        ],
        editedBy: {
          type: [{
            userId: String,
            added: [{
              date: {
                type: Date,
                default: Date.now,
              },
              quantity: Number,
              userId: {
                type: String,
              },
              itemId: String,
            }],
            changed: [{
              productId: String,
            }],
            oldLog: [{}],
          }],
          default: [],
        },
        
      },
    ],
  });

export const ProductThakurShyamnarayanDegreeCollege = mongoose.model("ProductThakurShyamnarayanDegreeCollege", productThakurShyamnarayanDegreeCollegesSchema);