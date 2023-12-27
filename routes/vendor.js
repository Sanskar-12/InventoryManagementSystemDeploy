import express from "express";
import {
  AddVendor,
  DeleteVendorById,
  GetAllVendor,
  GetAllVendorForRequizition,
  GetVendorById,
  GetVendorForOrderDetailsById,
} from "../controllers/vendor.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/vendor/add-vendor/:institute", isAuthenticated, AddVendor); //updated route see model before use and also there is enum so prefer model
router.get("/vendor/get-vendor/:institute", isAuthenticated, GetAllVendor);
router.get(
  "/vendor/get-vendor-for-requizition/:institute",
  isAuthenticated,
  GetAllVendorForRequizition
);

router.get("/vendor/get-vendor-byId/:id", isAuthenticated, GetVendorById);
router.get(
  "/vendor/get-vendor-for-OrderDetails-byId/:id",
  isAuthenticated,
  GetVendorForOrderDetailsById
);
router.delete("/vendor/delete/vendor/:id", isAuthenticated, DeleteVendorById);

export default router;
