import { Workorder } from "../models/workOrder.js";
import { workOrderThakurInstituteofAviation } from "../models/workOrderThakurInstituteofAviation.js";
import { WorkOrderThakurInstituteofAviationTechnology } from "../models/workOrderThakurInstituteofAviationTechnology.js";
import { workOrderThakurInstituteofHotelManagement } from "../models/workOrderThakurInstituteofHotelManagement.js";
import { WorkOrderThakurPolytechnic } from "../models/workOrderThakurPolytechnic.js";
import { WorkOrderThakurShyamnarayanDegreeColleges } from "../models/workOrderThakurShyamnarayanDegreeCollege.js";
import { Orders } from "../models/order.js";
import { OrderThakurInstituteofAviation } from "../models/orderThakurInstituteofAviation.js";
import { OrderThakurInstituteofAviationTechnology } from "../models/orderThakurInstituteofAviationTechnology.js";
import { OrderThakurInstituteofHotelManagement } from "../models/orderThakurInstituteofHotelManagement.js";
import { OrderThakurPolytechnic } from "../models/orderThakurPolytechnic.js";
import { OrderThakurShyamnarayanDegreeCollege } from "../models/orderThakurShyamnarayanDegreeCollege.js";

export const createWorkOrder = async (req, res, next) => {
  try {
    const { general_Information, taxation_Details, table_Data, institute } =
      req.body;
    const { orderId } = req.query;

    let workOrderdata;
    let order;

    if (institute === "Thakur Polytechnic") {
      workOrderdata = await WorkOrderThakurPolytechnic.create({
        general_Information,
        taxation_Details,
        table_Data,
      });
    } else if (institute === "Thakur Institute of Aviation Technology") {
      workOrderdata = await WorkOrderThakurInstituteofAviationTechnology.create(
        {
          general_Information,
          taxation_Details,
          table_Data,
        }
      );
    } else if (institute === "Thakur Institute of Aviation") {
      workOrderdata = await workOrderThakurInstituteofAviation.create({
        general_Information,
        taxation_Details,
        table_Data,
      });
    } else if (institute === "Thakur Shyamnarayan Degree College") {
      workOrderdata = await WorkOrderThakurShyamnarayanDegreeColleges.create({
        general_Information,
        taxation_Details,
        table_Data,
      });
    } else if (institute === "Thakur Institute of Hotel Management") {
      workOrderdata = await workOrderThakurInstituteofHotelManagement.create({
        general_Information,
        taxation_Details,
        table_Data,
      });
    } else
      workOrderdata = await Workorder.create({
        general_Information,
        taxation_Details,
        table_Data,
      });

    if (orderId) {
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
    }

    order.ordergeneration = true;
    await order.save();

    res.status(200).json({
      success: true,
      workOrderdata,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWorkOrder = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { institute } = req.params;

    let workOrderdata;

    if (institute === "Thakur Polytechnic") {
      workOrderdata = await WorkOrderThakurPolytechnic.findById(id);
    } else if (institute === "Thakur Institute of Aviation Technology") {
      workOrderdata =
        await WorkOrderThakurInstituteofAviationTechnology.findById(id);
    } else if (institute === "Thakur Institute of Aviation") {
      workOrderdata = await workOrderThakurInstituteofAviation.findById(id);
    } else if (institute === "Thakur Shyamnarayan Degree College") {
      workOrderdata = await WorkOrderThakurShyamnarayanDegreeColleges.findById(
        id
      );
    } else if (institute === "Thakur Institute of Hotel Management") {
      workOrderdata = await workOrderThakurInstituteofHotelManagement.findById(
        id
      );
    } else workOrderdata = await Workorder.findById(id);

    if (!workOrderdata) {
      res.status(400).json({
        success: false,
        message: "Work Order Not Found",
      });
    }

    res.status(200).json({
      success: true,
      workOrderdata,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllWorkOrder = async (req, res, next) => {
  try {
    const { institute } = req.params;

    let workOrderdata;

    if (institute === "Thakur Polytechnic") {
      workOrderdata = await WorkOrderThakurPolytechnic.find({}).sort({
        createdAt: -1,
      });
    } else if (institute === "Thakur Institute of Aviation Technology") {
      workOrderdata = await WorkOrderThakurInstituteofAviationTechnology.find(
        {}
      ).sort({ createdAt: -1 });
    } else if (institute === "Thakur Institute of Aviation") {
      workOrderdata = await workOrderThakurInstituteofAviation
        .find({})
        .sort({ createdAt: -1 });
    } else if (institute === "Thakur Shyamnarayan Degree College") {
      workOrderdata = await WorkOrderThakurShyamnarayanDegreeColleges.find(
        {}
      ).sort({ createdAt: -1 });
    } else if (institute === "Thakur Institute of Hotel Management") {
      workOrderdata = await workOrderThakurInstituteofHotelManagement
        .find({})
        .sort({ createdAt: -1 });
    } else workOrderdata = await Workorder.find({}).sort({ createdAt: -1 });

    if (!workOrderdata) {
      res.status(400).json({
        success: false,
        message: "Work Order Not Found",
      });
    }

    res.status(200).json({
      success: true,
      workOrderdata,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteWorkOrder = async (req, res, next) => {
  try {
    const { orderId } = req.query;
    const { institute } = req.params;

    let workOrderdata;

    if (institute === "Thakur Polytechnic") {
      workOrderdata = await WorkOrderThakurPolytechnic.findById(orderId);
    } else if (institute === "Thakur Institute of Aviation Technology") {
      workOrderdata =
        await WorkOrderThakurInstituteofAviationTechnology.findById(orderId);
    } else if (institute === "Thakur Institute of Aviation") {
      workOrderdata = await workOrderThakurInstituteofAviation.findById(
        orderId
      );
    } else if (institute === "Thakur Shyamnarayan Degree College") {
      workOrderdata = await WorkOrderThakurShyamnarayanDegreeColleges.findById(
        orderId
      );
    } else if (institute === "Thakur Institute of Hotel Management") {
      workOrderdata = await workOrderThakurInstituteofHotelManagement.findById(
        orderId
      );
    } else workOrderdata = await Workorder.findById(orderId);

    if (!workOrderdata) {
      res.status(400).json({
        success: false,
        message: "Work Order Not Found",
      });
    }

    await workOrderdata.deleteOne();

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
