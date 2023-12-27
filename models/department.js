import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  labs: [
    {
      LabNo: Number,
      FloorNo: Number,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  institute: {
    type: String,
  },
});

const Department = mongoose.model("Department", departmentSchema);

export default Department;
