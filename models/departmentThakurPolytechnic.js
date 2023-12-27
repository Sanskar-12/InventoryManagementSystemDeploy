import mongoose from "mongoose";

const departmentThakurPolytechnicSchema = new mongoose.Schema({
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
});

const DepartmentThakurPolytechnic = mongoose.model(
  "DepartmentThakurPolytechnic",
  departmentThakurPolytechnicSchema
);

export default DepartmentThakurPolytechnic;
