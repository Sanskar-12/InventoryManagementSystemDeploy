import mongoose from "mongoose";

const departmentThakurInstituteofAviationTechnologySchema = new mongoose.Schema(
  {
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
  }
);

const DepartmentThakurInstituteofAviationTechnology = mongoose.model(
  "DepartmentThakurInstituteofAviationTechnology",
  departmentThakurInstituteofAviationTechnologySchema
);

export default DepartmentThakurInstituteofAviationTechnology;
