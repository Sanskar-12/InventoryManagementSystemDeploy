import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createPurchaseOrder, deletePurchaseOrder, getAllPurchaseOrder, getPurchaseOrder } from "../controllers/purchaseOrder.js";

const router = express.Router();

router.post("/create/purchaseorder",isAuthenticated,createPurchaseOrder)
router.get("/get/purchaseorder/:institute",isAuthenticated,getPurchaseOrder)
router.get("/get/all/purchaseorder/:institute",isAuthenticated,getAllPurchaseOrder)
router.delete("/delete/purchaseorder/:institute",isAuthenticated,deletePurchaseOrder)


export default router;
