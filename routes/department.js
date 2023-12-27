
import express from "express";
import {
  addDepartment,
  getDepartment,
  departmentAddLab,
  getLabBydept,
  getById,
  getByName,
} from "../controllers/department.js";
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router();

router.post("/department/add-department/:institute",isAuthenticated, addDepartment);
router.get("/department/get-department/:institute",isAuthenticated, getDepartment);
router.post("/department/add-department-lab/:institute",isAuthenticated, departmentAddLab);
router.get("/department/get-department-lab/:institute",isAuthenticated, getLabBydept);
router.get("/department/get-department/:institute",isAuthenticated, getById);
router.get("/department/get-department-by-name/:institute",isAuthenticated, getByName);
export default router;
