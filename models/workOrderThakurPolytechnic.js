import mongoose from "mongoose";

const workOrderThakurPolytechnicschema = new mongoose.Schema({
  general_Information: {
    reference_number: String,
    subject: String,
    letter: String,
  },
  institute: {
    type: String,
  },
  taxation_Details: {
    current_total_amount: String,
    discount: String,
    total_after_discount: String,
    cgst: String,
    scgst: String,
    final_total_amount: String,
  },
  table_Data: Array,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const WorkOrderThakurPolytechnic = mongoose.model("WorkOrderThakurPolytechnic", workOrderThakurPolytechnicschema);