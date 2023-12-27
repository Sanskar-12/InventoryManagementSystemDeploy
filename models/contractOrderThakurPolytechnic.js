import mongoose from "mongoose";

const ContractOrderThakurPolytechnicschema = new mongoose.Schema({
  general_Information: {
    reference_number: String,
    to: String,
    subject: String,
    letter: String,
  },
  institute: {
    type: String,
  },
  table_Data: Array,
  
  total: String,
  discount: String,
  cgst: String,
  sgst: String,
  grandTotal: String,
  createdAt:{
    type:Date,
    default:Date.now()
  }
});

export const ContractOrderThakurPolytechnic = mongoose.model("ContractOrderThakurPolytechnic", ContractOrderThakurPolytechnicschema);