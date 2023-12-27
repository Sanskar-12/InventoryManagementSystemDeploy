import { Contractorder } from "../models/contractOrder.js";
import { ContractOrderThakurInstituteofAviation } from "../models/contractOrderThakurInstituteofAviation.js";
import { ContractOrderThakurInstituteofAviationTechnology } from "../models/contractOrderThakurInstituteofAviationTechnology.js";
import { ContractOrderThakurInstituteofHotelManagement } from "../models/contractOrderThakurInstituteofHotelManagement.js";
import { ContractOrderThakurPolytechnic } from "../models/contractOrderThakurPolytechnic.js";
import { ContractOrderThakurShyamnarayanDegreeCollege } from "../models/contractOrderThakurShyamnarayanDegreeCollege.js";
import { Orders } from "../models/order.js";
import { OrderThakurInstituteofAviation } from "../models/orderThakurInstituteofAviation.js";
import { OrderThakurInstituteofAviationTechnology } from "../models/orderThakurInstituteofAviationTechnology.js";
import { OrderThakurInstituteofHotelManagement } from "../models/orderThakurInstituteofHotelManagement.js";
import { OrderThakurPolytechnic } from "../models/orderThakurPolytechnic.js";
import { OrderThakurShyamnarayanDegreeCollege } from "../models/orderThakurShyamnarayanDegreeCollege.js";

export const createContractOrder = async (req, res, next) => {
  try {
    const {
      general_Information,
      table_Data,
      institute,
      total,
      discount,
      cgst,
      sgst,
      grandTotal,
    } = req.body;
    const { orderId } = req.query;


    let contractOrderdata;

    if (institute === "Thakur Polytechnic") {
      contractOrderdata = await ContractOrderThakurPolytechnic.create({
        general_Information,
        table_Data,
        institute,
        total,
        discount,
        cgst,
        sgst,
        grandTotal,
      });
    } else if (institute === "Thakur Institute of Aviation Technology") {
      contractOrderdata =
        await ContractOrderThakurInstituteofAviationTechnology.create({
          general_Information,
          table_Data,
          institute,
          total,
          discount,
          cgst,
          sgst,
          grandTotal,
        });
    } else if (institute === "Thakur Institute of Aviation") {
      contractOrderdata = await ContractOrderThakurInstituteofAviation.create({
        general_Information,
        table_Data,
        institute,
        total,
        discount,
        cgst,
        sgst,
        grandTotal,
      });
    } else if (institute === "Thakur Shyamnarayan Degree College") {
      contractOrderdata =
        await ContractOrderThakurShyamnarayanDegreeCollege.create({
          general_Information,
          table_Data,
          institute,
          total,
          discount,
          cgst,
          sgst,
          grandTotal,
        });
    } else if (institute === "Thakur Institute of Hotel Management") {
      contractOrderdata =
        await ContractOrderThakurInstituteofHotelManagement.create({
          general_Information,
          table_Data,
          institute,
          total,
          discount,
          cgst,
          sgst,
          grandTotal,
        });
    } else
      contractOrderdata = await Contractorder.create({
        general_Information,
        table_Data,
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
        contractOrderdata,
      });
    } else {
      res.status(200).json({
        success: true,
        contractOrderdata,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getContractOrder = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { institute } = req.params;

    let contractOrderdata;

    if (institute === "Thakur Polytechnic") {
      contractOrderdata = await ContractOrderThakurPolytechnic.findById(id);
    } else if (institute === "Thakur Institute of Aviation Technology") {
      contractOrderdata =
        await ContractOrderThakurInstituteofAviationTechnology.findById(id);
    } else if (institute === "Thakur Institute of Aviation") {
      contractOrderdata = await ContractOrderThakurInstituteofAviation.findById(
        id
      );
    } else if (institute === "Thakur Shyamnarayan Degree College") {
      contractOrderdata =
        await ContractOrderThakurShyamnarayanDegreeCollege.findById(id);
    } else if (institute === "Thakur Institute of Hotel Management") {
      contractOrderdata =
        await ContractOrderThakurInstituteofHotelManagement.findById(id);
    } else contractOrderdata = await Contractorder.findById(id);

    if (!contractOrderdata) {
      return res.status(400).json({
        success: false,
        message: "Contract Order Not Found",
      });
    }

    res.status(200).json({
      success: true,
      contractOrderdata,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllContractOrder = async (req, res, next) => {
  try {
    const { institute } = req.params;

    let contractOrderdata;

    if (institute === "Thakur Polytechnic") {
      contractOrderdata = await ContractOrderThakurPolytechnic.find({}).sort({
        createdAt: -1,
      });
    } else if (institute === "Thakur Institute of Aviation Technology") {
      contractOrderdata =
        await ContractOrderThakurInstituteofAviationTechnology.find({}).sort({
          createdAt: -1,
        });
    } else if (institute === "Thakur Institute of Aviation") {
      contractOrderdata = await ContractOrderThakurInstituteofAviation.find(
        {}
      ).sort({
        createdAt: -1,
      });
    } else if (institute === "Thakur Shyamnarayan Degree College") {
      contractOrderdata =
        await ContractOrderThakurShyamnarayanDegreeCollege.find({}).sort({
          createdAt: -1,
        });
    } else if (institute === "Thakur Institute of Hotel Management") {
      contractOrderdata =
        await ContractOrderThakurInstituteofHotelManagement.find({}).sort({
          createdAt: -1,
        });
    } else
      contractOrderdata = await Contractorder.find({}).sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      contractOrderdata,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteContractOrder = async (req, res, next) => {
  try {
    const { orderId } = req.query;
    const { institute } = req.params;

    let contractOrderdata;

    if (institute === "Thakur Polytechnic") {
      contractOrderdata = await ContractOrderThakurPolytechnic.findById(
        orderId
      );
    } else if (institute === "Thakur Institute of Aviation Technology") {
      contractOrderdata =
        await ContractOrderThakurInstituteofAviationTechnology.findById(
          orderId
        );
    } else if (institute === "Thakur Institute of Aviation") {
      contractOrderdata = await ContractOrderThakurInstituteofAviation.findById(
        orderId
      );
    } else if (institute === "Thakur Shyamnarayan Degree College") {
      contractOrderdata =
        await ContractOrderThakurShyamnarayanDegreeCollege.findById(orderId);
    } else if (institute === "Thakur Institute of Hotel Management") {
      contractOrderdata =
        await ContractOrderThakurInstituteofHotelManagement.findById(orderId);
    } else contractOrderdata = await Contractorder.findById(orderId);

    if (!contractOrderdata) {
      return res.status(400).json({
        success: false,
        message: "Contract Order Not Found",
      });
    }

    await contractOrderdata.deleteOne();

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
