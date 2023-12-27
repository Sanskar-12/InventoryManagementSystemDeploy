import mongoose from "mongoose";

const departmentThakurShyamnarayanDegreeCollegeSchema = new mongoose.Schema({
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

const DepartmentThakurShyamnarayanDegreeCollege = mongoose.model(
  "DepartmentThakurShyamnarayanDegreeCollege",
  departmentThakurShyamnarayanDegreeCollegeSchema
);

export default DepartmentThakurShyamnarayanDegreeCollege;
