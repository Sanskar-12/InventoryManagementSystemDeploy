import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createContractOrder, deleteContractOrder, getAllContractOrder, getContractOrder } from "../controllers/contractOrder.js";

const router = express.Router();

router.post("/create/contractorder",isAuthenticated,createContractOrder)
router.get("/get/contractorder/:institute",isAuthenticated,getContractOrder)
router.get("/get/all/contractorder/:institute",isAuthenticated,getAllContractOrder)
router.delete("/delete/contractorder/:institute",isAuthenticated,deleteContractOrder)


export default router;
