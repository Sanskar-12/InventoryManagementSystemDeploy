import mongoose from "mongoose";

const departmentThakurInstituteofHotelManagementSchema = new mongoose.Schema({
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

const DepartmentThakurInstituteofHotelManagement = mongoose.model(
  "DepartmentThakurInstituteofHotelManagement",
  departmentThakurInstituteofHotelManagementSchema
);

export default DepartmentThakurInstituteofHotelManagement;
