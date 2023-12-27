import mongoose from "mongoose";

const departmentThakurInstituteofAviationSchema = new mongoose.Schema({
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

const DepartmentThakurInstituteofAviation = mongoose.model(
  "DepartmentThakurInstituteofAviation",
  departmentThakurInstituteofAviationSchema
);

export default DepartmentThakurInstituteofAviation;
