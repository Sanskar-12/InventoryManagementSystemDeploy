import Department from "../models/department.js";
import DepartmentThakurInstituteofAviation from "../models/departmentThakurInstituteofAviation.js";
import DepartmentThakurInstituteofAviationTechnology from "../models/departmentThakurInstituteofAviationTechnology.js";
import DepartmentThakurShyamnarayanDegreeCollege from "../models/departmentThakurShyamnarayanDegreeCollege.js";
import DepartmentThakurPolytechnic from "../models/departmentThakurPolytechnic.js";
import DepartmentThakurInstituteofHotelManagement from "../models/departmentThakurInstituteofHotelManagement.js";
export const addDepartment = async (req, res, next) => {
  try {
    let institute = req.params.institute;
    const { name, labs } = req.body;
    console.log(name);
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please Provide all fields",
      });
    }

    let department;
    if (req.params.institute === "Thakur Polytechnic") {
      department = await DepartmentThakurPolytechnic.create({ name, labs });
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      department = await DepartmentThakurInstituteofAviationTechnology.create({
        name,
        labs,
      });
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      department = await DepartmentThakurInstituteofAviation.create({
        name,
        labs,
      });
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      department = await DepartmentThakurShyamnarayanDegreeCollege.create({
        name,
        labs,
      });
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      department = await DepartmentThakurInstituteofHotelManagement.create({
        name,
        labs,
      });
    } else {
      department = await Department.create({ name, institute, labs });
    }

    res.status(200).json({
      success: true,
      department,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const getDepartment = async (req, res, next) => {
  try {
    // const department = await Department.find({});

    let department;
    if (req.params.institute === "Thakur Polytechnic") {
      department = await DepartmentThakurPolytechnic.find({});
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      department = await DepartmentThakurInstituteofAviationTechnology.find({});
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      department = await DepartmentThakurInstituteofAviation.find({});
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      department = await DepartmentThakurShyamnarayanDegreeCollege.find({});
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      department = await DepartmentThakurInstituteofHotelManagement.find({});
    } else {
      department = await Department.find({ institute });
    }
    console.log(department);
    res.status(200).json({
      success: true,
      department,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const departmentAddLab = async (req, res, next) => {
  try {
    // let department = await Department.findOne({ name: req.body.name });
    let department;
    let arr = [
      {
        LabNo: req.body.LabNo,
        FloorNo: req.body.FloorNo,
        date: new Date(),
      },
    ];

    console.log(arr);
    if (req.params.institute === "Thakur Polytechnic") {
      department = await DepartmentThakurPolytechnic.findOne({
        name: req.body.DeptName,
      });
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      department = await DepartmentThakurInstituteofAviationTechnology.findOne({
        name: req.body.DeptName,
      });
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      department = await DepartmentThakurInstituteofAviation.findOne({
        name: req.body.DeptName,
      });
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      department = await DepartmentThakurShyamnarayanDegreeCollege.findOne({
        name: req.body.DeptName,
      });
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      department = await DepartmentThakurInstituteofHotelManagement.findOne({
        name: req.body.DeptName,
      });
    } else {
      department = await Department.findOne({
        name: req.body.DeptName,
        institute,
      });
    }

    console.log(department);

    if (!department) {
      department = new Department({
        name: req.body.DeptName,
        labs: arr,
      });
    } else {
      department.labs.push(...arr);
    }
    console.log(arr + "Second time");
    await department.save();

    console.log(`Labs added to department "${req.body.DeptName}"`);

    res
      .status(200)
      .json({ message: `Labs added to department "${req.body.DeptName}"` });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLabBydept = async (req, res, next) => {
  try {
    let name = req.query.name;
    let dept;
    if (req.params.institute === "Thakur Polytechnic") {
      dept = await DepartmentThakurPolytechnic.findOne({ name });
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      dept = await DepartmentThakurInstituteofAviationTechnology.findOne({
        name,
      });
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      dept = await DepartmentThakurInstituteofAviation.findOne({ name });
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      dept = await DepartmentThakurShyamnarayanDegreeCollege.findOne({ name });
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      dept = await DepartmentThakurInstituteofHotelManagement.findOne({ name });
    } else {
      dept = await Department.findOne({ name, institute });
    }
    console.log(dept);
    res.status(200).json({
      success: true,
      labs: dept.labs,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getById = async (req, res, next) => {
  try {
    const departmentId = req.query.departmentId;
    // const department = await Department.findById(departmentId);
    let department;
    if (req.params.institute === "Thakur Polytechnic") {
      department = await DepartmentThakurPolytechnic.findById(departmentId);
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      department = await DepartmentThakurInstituteofAviationTechnology.findById(
        departmentId
      );
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      department = await DepartmentThakurInstituteofAviation.findById(
        departmentId
      );
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      department = await DepartmentThakurShyamnarayanDegreeCollege.findById(
        departmentId
      );
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      department = await DepartmentThakurInstituteofHotelManagement.findById(
        departmentId
      );
    } else {
      department = await Department.findById(departmentId);
    }

    res.status(200).json({ department });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getByName = async (req, res, next) => {
  try {
    let name = req.query.name;

    let department;
    if (req.params.institute === "Thakur Polytechnic") {
      department = await DepartmentThakurPolytechnic.find({ name });
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      department = await DepartmentThakurInstituteofAviationTechnology.find({
        name,
      });
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      department = await DepartmentThakurInstituteofAviation.find({ name });
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      department = await DepartmentThakurShyamnarayanDegreeCollege.find({
        name,
      });
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      department = await DepartmentThakurInstituteofHotelManagement.find({
        name,
      });
    } else {
      department = await Department.find({ name });
    }
    res.status(200).json({ department });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
