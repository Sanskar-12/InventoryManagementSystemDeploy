import express from "express" 

import { isAuthenticated } from "../middlewares/auth.js"
import { AcceptOrder, AcceptOrderforApprover, ApproverOrder, InwardOrders, RejectOrder, RejectOrderforApprover, changeStatus, createOrder, filterOrder, filterOrders, filterOrdersofApprovedOrders, filterOrdersofInwardOrders, filterOrdersofRejectedOrders, getApprovedOrder, getInvoiceById, getRejectedOrder, getallOrderById, getallOrders, getallOrdersforIntiatorSuperAdminandAdmin, inventoryProducts, moveToInwardArchive, moveToOrderArchive, orderArchive, processOrder } from "../controllers/order.js"

const router=express.Router()

router.post("/order/add-order",isAuthenticated,createOrder)
router.get("/order/get-order/:institute",isAuthenticated,getallOrders)
router.get("/order/get-order-intiator-superadmin-admin/:institute",isAuthenticated,getallOrdersforIntiatorSuperAdminandAdmin)
router.get("/order/filter",isAuthenticated,filterOrder)
router.post("/order/accept/:institute",isAuthenticated,AcceptOrder)
router.post("/order/reject/:institute",isAuthenticated,RejectOrder)
router.get("/order/getById/:institute",isAuthenticated,getallOrderById)
router.get("/invoice/getById/:institute",isAuthenticated,getInvoiceById)
router.get("/order/getapproved/:institute",isAuthenticated,getApprovedOrder)
router.get("/order/getrejected/:institute",isAuthenticated,getRejectedOrder)
router.put("/process/order/:institute",isAuthenticated,processOrder)
router.get("/order/remarkedorders/:institute",isAuthenticated,ApproverOrder)
router.post("/order/acceptforapprover/:institute",isAuthenticated,AcceptOrderforApprover)
router.post("/order/rejectforapprover/:institute",isAuthenticated,RejectOrderforApprover)
router.get("/order/inwardorders/:institute",isAuthenticated,InwardOrders)
router.put("/change/status/:institute",isAuthenticated,changeStatus)
router.put("/move/to/inward/archive/:institute",isAuthenticated,moveToInwardArchive)
router.put("/move/to/order/archive/:institute",isAuthenticated,moveToOrderArchive)
router.get("/get/order/archive/:institute",isAuthenticated,orderArchive)
router.get("/get/inventory/products/:institute",isAuthenticated,inventoryProducts)
router.get("/filter/orders/:institute",isAuthenticated,filterOrders)
router.get("/filter/orders/approved/:institute",isAuthenticated,filterOrdersofApprovedOrders)
router.get("/filter/orders/rejected/:institute",isAuthenticated,filterOrdersofRejectedOrders)
router.get("/filter/orders/inward/:institute",isAuthenticated,filterOrdersofInwardOrders)


export default router