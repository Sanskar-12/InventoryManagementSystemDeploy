import express from "express";
import {
  Product,
  deleteProduct,
  editProduct,
  filterProducts,
  getProduct,
  getallProducts,
  orderToproduct,
  updateItem,
} from "../controllers/Product.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create/product/:institute", isAuthenticated, Product);
router.post(
  "/get/received/product/:institute",
  isAuthenticated,
  orderToproduct
);
router.get("/get/all/product/:institute", isAuthenticated, getallProducts);
router.get("/filter/products/:institute", isAuthenticated, filterProducts);
router.get("/get/product/:institute/:productId", isAuthenticated, getProduct);
router.put("/update/product/:productId", isAuthenticated, editProduct);
router.delete("/delete/product/:institute", isAuthenticated, deleteProduct);
router.put("/update/item/:institute", isAuthenticated, updateItem);
export default router;
