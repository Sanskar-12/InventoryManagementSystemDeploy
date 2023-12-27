import { Orders } from "../models/order.js";
import { OrderThakurInstituteofAviation } from "../models/orderThakurInstituteofAviation.js";
import { OrderThakurInstituteofAviationTechnology } from "../models/orderThakurInstituteofAviationTechnology.js";
import { OrderThakurInstituteofHotelManagement } from "../models/orderThakurInstituteofHotelManagement.js";
import { OrderThakurPolytechnic } from "../models/orderThakurPolytechnic.js";
import { OrderThakurShyamnarayanDegreeCollege } from "../models/orderThakurShyamnarayanDegreeCollege.js";
import { Purchaseorder } from "../models/purchaseOrder.js";
import { PurchaseOrderThakurInstituteofAviation } from "../models/purchaseOrderThakurInstituteofAviation.js";
import { PurchaseOrderThakurInstituteofAviationTechnology } from "../models/purchaseOrderThakurInstituteofAviationTechnology.js";
import { PurchaseOrderThakurInstituteofHotelManagement } from "../models/purchaseOrderThakurInstituteofHotelManagement.js";
import { PurchaseOrderThakurPolytechnic } from "../models/purchaseOrderThakurPolytechnic.js";
import { PurchaseOrderThakurShyamnarayanDegreeCollege } from "../models/purchaseOrderThakurShyamnarayanDegreeCollege.js";

export const createPurchaseOrder = async (req, res, next) => {
  try {
    const {
      general_Information,
      table_Data,
      terms_and_conditions,
      institute,
      total,
      discount,
      cgst,
      sgst,
      grandTotal,
    } = req.body;
    const { orderId } = req.query;

    console.log(orderId);

    let purchaseOrderdata;

    if (institute === "Thakur Polytechnic") {
      purchaseOrderdata = await PurchaseOrderThakurPolytechnic.create({
        general_Information,
        table_Data,
        terms_and_conditions,
        institute,
        total,
        discount,
        cgst,
        sgst,
        grandTotal,
      });
    } else if (institute === "Thakur Institute of Aviation Technology") {
      purchaseOrderdata =
        await PurchaseOrderThakurInstituteofAviationTechnology.create({
          general_Information,
          table_Data,
          terms_and_conditions,
          institute,
          total,
          discount,
          cgst,
          sgst,
          grandTotal,
        });
    } else if (institute === "Thakur Institute of Aviation") {
      purchaseOrderdata = await PurchaseOrderThakurInstituteofAviation.create({
        general_Information,
        table_Data,
        terms_and_conditions,
        institute,
        total,
        discount,
        cgst,
        sgst,
        grandTotal,
      });
    } else if (institute === "Thakur Shyamnarayan Degree College") {
      purchaseOrderdata =
        await PurchaseOrderThakurShyamnarayanDegreeCollege.create({
          general_Information,
          table_Data,
          terms_and_conditions,
          institute,
          total,
          discount,
          cgst,
          sgst,
          grandTotal,
        });
    } else if (institute === "Thakur Institute of Hotel Management") {
      purchaseOrderdata =
        await PurchaseOrderThakurInstituteofHotelManagement.create({
          general_Information,
          table_Data,
          terms_and_conditions,
          institute,
          total,
          discount,
          cgst,
          sgst,
          grandTotal,
        });
    } else
      purchaseOrderdata = await Purchaseorder.create({
        general_Information,
        table_Data,
        terms_and_conditions,
        institute,
        total,
        discount,
        cgst,
        sgst,
        grandTotal,
      });

    if (orderId) {
      let order;

      if (institute === "Thakur Polytechnic") {
        order = await OrderThakurPolytechnic.findById(orderId);
      } else if (institute === "Thakur Institute of Aviation Technology") {
        order = await OrderThakurInstituteofAviationTechnology.findById(
          orderId
        );
      } else if (institute === "Thakur Institute of Aviation") {
        order = await OrderThakurInstituteofAviation.findById(orderId);
      } else if (institute === "Thakur Shyamnarayan Degree College") {
        order = await OrderThakurShyamnarayanDegreeCollege.findById(orderId);
      } else if (institute === "Thakur Institute of Hotel Management") {
        order = await OrderThakurInstituteofHotelManagement.findById(orderId);
      } else order = await Orders.findById(orderId);

      order.ordergeneration = true;
      await order.save();

      res.status(200).json({
        success: true,
        purchaseOrderdata,
      });
    } else {
      res.status(200).json({
        success: true,
        purchaseOrderdata,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPurchaseOrder = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { institute } = req.params;

    let purchaseOrderdata;

    if (institute === "Thakur Polytechnic") {
      purchaseOrderdata = await PurchaseOrderThakurPolytechnic.findById(id);
    } else if (institute === "Thakur Institute of Aviation Technology") {
      purchaseOrderdata =
        await PurchaseOrderThakurInstituteofAviationTechnology.findById(id);
    } else if (institute === "Thakur Institute of Aviation") {
      purchaseOrderdata = await PurchaseOrderThakurInstituteofAviation.findById(
        id
      );
    } else if (institute === "Thakur Shyamnarayan Degree College") {
      purchaseOrderdata =
        await PurchaseOrderThakurShyamnarayanDegreeCollege.findById(id);
    } else if (institute === "Thakur Institute of Hotel Management") {
      purchaseOrderdata =
        await PurchaseOrderThakurInstituteofHotelManagement.findById(id);
    } else purchaseOrderdata = await Purchaseorder.findById(id);

    if (!purchaseOrderdata) {
      return res.status(400).json({
        success: false,
        message: "Purchase Order Not Found",
      });
    }

    res.status(200).json({
      success: true,
      purchaseOrderdata,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllPurchaseOrder = async (req, res, next) => {
  try {
    const { institute } = req.params;

    let purchaseOrderdata;

    if (institute === "Thakur Polytechnic") {
      purchaseOrderdata = await PurchaseOrderThakurPolytechnic.find({}).sort({
        createdAt: -1,
      });
    } else if (institute === "Thakur Institute of Aviation Technology") {
      purchaseOrderdata =
        await PurchaseOrderThakurInstituteofAviationTechnology.find({}).sort({
          createdAt: -1,
        });
    } else if (institute === "Thakur Institute of Aviation") {
      purchaseOrderdata = await PurchaseOrderThakurInstituteofAviation.find(
        {}
      ).sort({
        createdAt: -1,
      });
    } else if (institute === "Thakur Shyamnarayan Degree College") {
      purchaseOrderdata =
        await PurchaseOrderThakurShyamnarayanDegreeCollege.find({}).sort({
          createdAt: -1,
        });
    } else if (institute === "Thakur Institute of Hotel Management") {
      purchaseOrderdata =
        await PurchaseOrderThakurInstituteofHotelManagement.find({}).sort({
          createdAt: -1,
        });
    } else
      purchaseOrderdata = await Purchaseorder.find({}).sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      purchaseOrderdata,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePurchaseOrder = async (req, res, next) => {
  try {
    const { orderId } = req.query;
    const { institute } = req.params;

    let purchaseOrderdata;

    if (institute === "Thakur Polytechnic") {
      purchaseOrderdata = await PurchaseOrderThakurPolytechnic.findById(
        orderId
      );
    } else if (institute === "Thakur Institute of Aviation Technology") {
      purchaseOrderdata =
        await PurchaseOrderThakurInstituteofAviationTechnology.findById(
          orderId
        );
    } else if (institute === "Thakur Institute of Aviation") {
      purchaseOrderdata = await PurchaseOrderThakurInstituteofAviation.findById(
        orderId
      );
    } else if (institute === "Thakur Shyamnarayan Degree College") {
      purchaseOrderdata =
        await PurchaseOrderThakurShyamnarayanDegreeCollege.findById(orderId);
    } else if (institute === "Thakur Institute of Hotel Management") {
      purchaseOrderdata =
        await PurchaseOrderThakurInstituteofHotelManagement.findById(orderId);
    } else purchaseOrderdata = await Purchaseorder.findById(orderId);

    if (!purchaseOrderdata) {
      return res.status(400).json({
        success: false,
        message: "Purchase Order Not Found",
      });
    }

    await purchaseOrderdata.deleteOne();

    res.status(200).json({
      success: true,
      message: "Order Deleted",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
