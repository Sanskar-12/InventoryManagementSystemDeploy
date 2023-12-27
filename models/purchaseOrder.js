import mongoose from "mongoose";

const schema = new mongoose.Schema({
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
  terms_and_conditions: {
    payment: String,
    waranty: String,
    delivery: String,
  },
  total: String,
  discount: String,
  cgst: String,
  sgst: String,
  grandTotal: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Purchaseorder = mongoose.model("Purchaseorder", schema);
