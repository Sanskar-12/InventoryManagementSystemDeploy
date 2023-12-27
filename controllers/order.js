import { Orders } from "../models/order.js";
import { OrderThakurInstituteofAviation } from "../models/orderThakurInstituteofAviation.js";
import { OrderThakurInstituteofAviationTechnology } from "../models/orderThakurInstituteofAviationTechnology.js";
import { OrderThakurInstituteofHotelManagement } from "../models/orderThakurInstituteofHotelManagement.js";
import { OrderThakurPolytechnic } from "../models/orderThakurPolytechnic.js";
import { OrderThakurShyamnarayanDegreeCollege } from "../models/orderThakurShyamnarayanDegreeCollege.js";
import { Vendors } from "../models/vendor.js";

export const createOrder = async (req, res, next) => {
  try {
    let orders;
    const {
      requisition_name,
      orderType,
      department,
      lab,
      itemtype,
      vendor_id,
      items,
      institute,
    } = req.body;
    if (institute === "Thakur Polytechnic") {
      orders = await OrderThakurPolytechnic.create({
        requisition_name,
        orderType,
        department,
        lab,
        itemtype,
        vendor_id,
        items,
        institute,
      });
    } else if (institute === "Thakur Institute of Aviation Technology") {
      orders = await OrderThakurInstituteofAviationTechnology.create({
        requisition_name,
        orderType,
        department,
        lab,
        itemtype,
        vendor_id,
        items,
        institute,
      });
    } else if (institute === "Thakur Institute of Aviation") {
      orders = await OrderThakurInstituteofAviation.create({
        requisition_name,
        orderType,
        department,
        lab,
        itemtype,
        vendor_id,
        items,
        institute,
      });
    } else if (institute === "Thakur Shyamnarayan Degree College") {
      orders = await OrderThakurShyamnarayanDegreeCollege.create({
        requisition_name,
        orderType,
        department,
        lab,
        itemtype,
        vendor_id,
        items,
        institute,
      });
    } else if (institute === "Thakur Institute of Hotel Management") {
      orders = await OrderThakurInstituteofHotelManagement.create({
        requisition_name,
        orderType,
        department,
        lab,
        itemtype,
        vendor_id,
        items,
        institute,
      });
    } else
      orders = await Orders.create({
        requisition_name,
        orderType,
        department,
        lab,
        itemtype,
        vendor_id,
        items,
        institute,
      });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getallOrders = async (req, res, next) => {
  try {
    let orders;
    let tempInstitute = req.params.institute;
    if (req.params.institute === "Thakur Polytechnic") {
      orders = await OrderThakurPolytechnic.find({}).sort({ createdBy: -1 }).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      orders = await OrderThakurInstituteofAviationTechnology.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      orders = await OrderThakurInstituteofAviation.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      orders = await OrderThakurShyamnarayanDegreeCollege.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      orders = await OrderThakurInstituteofHotelManagement.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else
      orders = await Orders.find({ institute: tempInstitute }).sort({
        createdBy: -1,
      }).select("-invoice");

    orders = orders.filter((item) => item.orderaction === "none");

    res.status(200).json({
      success: true,
      orders,
      // orderCount,
      // resultPerPage
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getallOrdersforIntiatorSuperAdminandAdmin = async (
  req,
  res,
  next
) => {
  try {
    let orders;
    let tempInstitute = req.params.institute;
    if (req.params.institute === "Thakur Polytechnic") {
      orders = await OrderThakurPolytechnic.find({}).sort({ createdBy: -1 }).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      orders = await OrderThakurInstituteofAviationTechnology.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      orders = await OrderThakurInstituteofAviation.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      orders = await OrderThakurShyamnarayanDegreeCollege.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      orders = await OrderThakurInstituteofHotelManagement.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else
      orders = await Orders.find({ institute: tempInstitute }).sort({
        createdBy: -1,
      }).select("-invoice");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const filterOrder = async (req, res, next) => {
  try {
    const { selectedCategories } = req.body;

    if (!selectedCategories || selectedCategories.length === 0) {
      let items;
      let tempInstitute = req.params.institute;
      if (req.params.institute === "Thakur Polytechnic") {
        items = await OrderThakurPolytechnic.find({}).sort({ createdBy: -1 });
      } else if (
        req.params.institute === "Thakur Institute of Aviation Technology"
      ) {
        items = await OrderThakurInstituteofAviationTechnology.find({}).sort({
          createdBy: -1,
        });
      } else if (req.params.institute === "Thakur Institute of Aviation") {
        items = await OrderThakurInstituteofAviation.find({}).sort({
          createdBy: -1,
        });
      } else if (
        req.params.institute === "Thakur Shyamnarayan Degree College"
      ) {
        items = await OrderThakurShyamnarayanDegreeCollege.find({}).sort({
          createdBy: -1,
        });
      } else if (
        req.params.institute === "Thakur Institute of Hotel Management"
      ) {
        items = await OrderThakurInstituteofHotelManagement.find({}).sort({
          createdBy: -1,
        });
      } else
        items = await Orders.find({ institute: tempInstitute }).sort({
          createdBy: -1,
        });
      return res.status(200).json({
        success: true,
        items,
      });
    } else {
      let items;
      let tempInstitute = req.params.institute;
      if (req.params.institute === "Thakur Polytechnic") {
        items = await OrderThakurPolytechnic.find({
          categorie: { $in: selectedCategories },
        });
      } else if (
        req.params.institute === "Thakur Institute of Aviation Technology"
      ) {
        items = await OrderThakurInstituteofAviationTechnology.find({
          categorie: { $in: selectedCategories },
        });
      } else if (req.params.institute === "Thakur Institute of Aviation") {
        items = await OrderThakurInstituteofAviation.find({
          categorie: { $in: selectedCategories },
        });
      } else if (
        req.params.institute === "Thakur Shyamnarayan Degree College"
      ) {
        items = await OrderThakurShyamnarayanDegreeCollege.find({
          categorie: { $in: selectedCategories },
        });
      } else if (
        req.params.institute === "Thakur Institute of Hotel Management"
      ) {
        items = await OrderThakurInstituteofHotelManagement.find({
          categorie: { $in: selectedCategories },
        });
      } else
        items = await Orders.find({ categorie: { $in: selectedCategories } });

      return res.status(200).json({
        success: true,
        items,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const AcceptOrder = async (req, res, next) => {
  try {
    let orderId = req.query.orderId;
    let order;
    let tempInstitute = req.params.institute;
    if (req.params.institute === "Thakur Polytechnic") {
      order = await OrderThakurPolytechnic.findById(orderId);
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      order = await OrderThakurInstituteofAviationTechnology.findById(orderId);
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      order = await OrderThakurInstituteofAviation.findById(orderId);
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      order = await OrderThakurShyamnarayanDegreeCollege.findById(orderId);
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      order = await OrderThakurInstituteofHotelManagement.findById(orderId);
    } else order = await Orders.findById(orderId);

    if (!order) {
      res.status(400).json({
        success: false,
        message: "Order Not Found",
      });
    }

    order.orderaction = "Approved";
    order.remark = req.body.remark;
    order.verifierName = req.user.user_detail.username;
    order.verifierApprovedDate = new Date(Date.now());
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Approved",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const RejectOrder = async (req, res, next) => {
  try {
    let orderId = req.query.orderId;
    let order;
    let tempInstitute = req.params.institute;
    if (req.params.institute === "Thakur Polytechnic") {
      order = await OrderThakurPolytechnic.findById(orderId);
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      order = await OrderThakurInstituteofAviationTechnology.findById(orderId);
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      order = await OrderThakurInstituteofAviation.findById(orderId);
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      order = await OrderThakurShyamnarayanDegreeCollege.findById(orderId);
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      order = await OrderThakurInstituteofHotelManagement.findById(orderId);
    } else order = await Orders.findById(orderId);

    if (!order) {
      res.status(400).json({
        success: false,
        message: "Order Not Found",
      });
    }

    order.orderaction = "Rejected";
    order.remark = req.body.remark;
    order.verifierName = req.user.user_detail.username;
    order.verifierRejectedDate = new Date(Date.now());
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Rejected",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const getallOrderById = async (req, res, next) => {
  try {
    let orderId = req.query.orderId;
    let order;
    if(req.params.institute==="Thakur Polytechnic")
    {
      order=await OrderThakurPolytechnic.findById(orderId).select("-invoice");

    }
    else if(req.params.institute==="Thakur Institute of Aviation Technology")
    {
      order=await OrderThakurInstituteofAviationTechnology.findById(orderId).select("-invoice");

    }
    else if(req.params.institute==="Thakur Institute of Aviation")
    {
      order=await OrderThakurInstituteofAviation.findById(orderId).select("-invoice");

    }
    else if(req.params.institute==="Thakur Shyamnarayan Degree College")
    {
      order=await OrderThakurShyamnarayanDegreeCollege.findById(orderId).select("-invoice");

    }
    else if(req.params.institute==="Thakur Institute of Hotel Management")
    {
      order=await OrderThakurInstituteofHotelManagement.findById(orderId).select("-invoice");

    }
    else
    order = await Orders.findById(orderId).select("-invoice");

    
    res.status(200).json({
      success: true,
      order,
      // vendor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getInvoiceById = async (req, res, next) => {
  try {
    let orderId = req.query.orderId;
    let order;
    if(req.params.institute==="Thakur Polytechnic")
    {
      order=await OrderThakurPolytechnic.findById(orderId).select("-requisition_name -department -institute -orderType -lab -itemtype -vendor_id -items -orderaction -approveorderaction -orderStatus -remark -approverremark -verifierName -approverName -verifierApprovedDate -verifierRejectedDate -createdBy -inwardDate -archived -orderArchived -ordergeneration");

    }
    else if(req.params.institute==="Thakur Institute of Aviation Technology")
    {
      order=await OrderThakurInstituteofAviationTechnology.findById(orderId).select("-requisition_name -department -institute -orderType -lab -itemtype -vendor_id -items -orderaction -approveorderaction -orderStatus -remark -approverremark -verifierName -approverName -verifierApprovedDate -verifierRejectedDate -createdBy -inwardDate -archived -orderArchived -ordergeneration");

    }
    else if(req.params.institute==="Thakur Institute of Aviation")
    {
      order=await OrderThakurInstituteofAviation.findById(orderId).select("-requisition_name -department -institute -orderType -lab -itemtype -vendor_id -items -orderaction -approveorderaction -orderStatus -remark -approverremark -verifierName -approverName -verifierApprovedDate -verifierRejectedDate -createdBy -inwardDate -archived -orderArchived -ordergeneration");

    }
    else if(req.params.institute==="Thakur Shyamnarayan Degree College")
    {
      order=await OrderThakurShyamnarayanDegreeCollege.findById(orderId).select("-requisition_name -department -institute -orderType -lab -itemtype -vendor_id -items -orderaction -approveorderaction -orderStatus -remark -approverremark -verifierName -approverName -verifierApprovedDate -verifierRejectedDate -createdBy -inwardDate -archived -orderArchived -ordergeneration");

    }
    else if(req.params.institute==="Thakur Institute of Hotel Management")
    {
      order=await OrderThakurInstituteofHotelManagement.findById(orderId).select("-requisition_name -department -institute -orderType -lab -itemtype -vendor_id -items -orderaction -approveorderaction -orderStatus -remark -approverremark -verifierName -approverName -verifierApprovedDate -verifierRejectedDate -createdBy -inwardDate -archived -orderArchived -ordergeneration");

    }
    else
    order = await Orders.findById(orderId).select("-requisition_name -department -institute -orderType -lab -itemtype -vendor_id -items -orderaction -approveorderaction -orderStatus -remark -approverremark -verifierName -approverName -verifierApprovedDate -verifierRejectedDate -createdBy -inwardDate -archived -orderArchived -ordergeneration");

    

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const getApprovedOrder = async (req, res, next) => {
  try {
    let orders;
    let tempInstitute = req.params.institute;
    if (req.params.institute === "Thakur Polytechnic") {
      orders = await OrderThakurPolytechnic.find({}).sort({ createdBy: -1 }).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      orders = await OrderThakurInstituteofAviationTechnology.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      orders = await OrderThakurInstituteofAviation.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      orders = await OrderThakurShyamnarayanDegreeCollege.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      orders = await OrderThakurInstituteofHotelManagement.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else
      orders = await Orders.find({ institute: tempInstitute }).sort({
        createdBy: -1,
      }).select("-invoice");

    const approvedOrder = orders.filter(
      (item) => item.orderaction === "Approved" && item.approveorderaction==="Approved"
    );

    res.status(200).json({
      success: true,
      approvedOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRejectedOrder = async (req, res, next) => {
  try {
    let orders;
    let tempInstitute = req.params.institute;
    if (req.params.institute === "Thakur Polytechnic") {
      orders = await OrderThakurPolytechnic.find({}).sort({ createdBy: -1 }).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      orders = await OrderThakurInstituteofAviationTechnology.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      orders = await OrderThakurInstituteofAviation.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      orders = await OrderThakurShyamnarayanDegreeCollege.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      orders = await OrderThakurInstituteofHotelManagement.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else
      orders = await Orders.find({ institute: tempInstitute }).sort({
        createdBy: -1,
      }).select("-invoice");

    const rejectedOrder = orders.filter(
      (item) =>
        item.orderaction === "Rejected" ||
        item.approveorderaction === "Rejected"
    );

    res.status(200).json({
      success: true,
      rejectedOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const processOrder = async (req, res, next) => {
  try {
    let orderId = req.query.orderId;
    let order;
    let tempInstitute = req.params.institute;
    if (req.params.institute === "Thakur Polytechnic") {
      order = await OrderThakurPolytechnic.findById(orderId);
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      order = await OrderThakurInstituteofAviationTechnology.findById(orderId);
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      order = await OrderThakurInstituteofAviation.findById(orderId);
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      order = await OrderThakurShyamnarayanDegreeCollege.findById(orderId);
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      order = await OrderThakurInstituteofHotelManagement.findById(orderId);
    } else order = await Orders.findById(orderId);

    const { status } = req.body;

    order.orderStatus = status;
    await order.save();

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const ApproverOrder = async (req, res, next) => {
  try {
    let order;
    let tempInstitute = req.params.institute;
    if (req.params.institute === "Thakur Polytechnic") {
      order = await OrderThakurPolytechnic.find({}).sort({ createdBy: -1 }).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      order = await OrderThakurInstituteofAviationTechnology.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      order = await OrderThakurInstituteofAviation.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      order = await OrderThakurShyamnarayanDegreeCollege.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      order = await OrderThakurInstituteofHotelManagement.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else
      order = await Orders.find({ institute: tempInstitute }).sort({
        createdBy: -1,
      }).select("-invoice");

    let orders = order.filter(
      (item) =>
        item.approveorderaction === "none" &&
        item.remark !== undefined &&
        item.orderaction === "Approved" &&
        item.orderArchived === undefined
    );

    orders = orders.filter((item) => item.institute === req.params.institute);
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const AcceptOrderforApprover = async (req, res, next) => {
  try {
    let orderId = req.query.orderId;
    let order;
    let tempInstitute = req.params.institute;
    if (req.params.institute === "Thakur Polytechnic") {
      order = await OrderThakurPolytechnic.findById(orderId);
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      order = await OrderThakurInstituteofAviationTechnology.findById(orderId);
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      order = await OrderThakurInstituteofAviation.findById(orderId);
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      order = await OrderThakurShyamnarayanDegreeCollege.findById(orderId);
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      order = await OrderThakurInstituteofHotelManagement.findById(orderId);
    } else order = await Orders.findById(orderId);

    if (!order) {
      res.status(400).json({
        success: false,
        message: "Order Not Found",
      });
    }

    console.log(req.user);

    order.approveorderaction = "Approved";
    order.approverremark = req.body.approverremark;
    order.verifierName = req.user.user_detail.username;
    order.verifierApprovedDate = new Date(Date.now());
    order.inwardDate = new Date(Date.now());

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Approved",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const RejectOrderforApprover = async (req, res, next) => {
  try {
    let orderId = req.query.orderId;
    let order;
    let tempInstitute = req.params.institute;
    if (req.params.institute === "Thakur Polytechnic") {
      order = await OrderThakurPolytechnic.findById(orderId);
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      order = await OrderThakurInstituteofAviationTechnology.findById(orderId);
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      order = await OrderThakurInstituteofAviation.findById(orderId);
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      order = await OrderThakurShyamnarayanDegreeCollege.findById(orderId);
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      order = await OrderThakurInstituteofHotelManagement.findById(orderId);
    } else order = await Orders.findById(orderId);

    if (!order) {
      res.status(400).json({
        success: false,
        message: "Order Not Found",
      });
    }

    order.approveorderaction = "Rejected";
    order.approverremark = req.body.approverremark;
    order.verifierName = req.user.user_detail.username;
    order.verifierRejectedDate = new Date(Date.now());
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Rejected",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const InwardOrders = async (req, res, next) => {
  try {
    let order;
    let tempInstitute = req.params.institute;
    if (req.params.institute === "Thakur Polytechnic") {
      order = await OrderThakurPolytechnic.find({}).sort({ createdBy: -1 }).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      order = await OrderThakurInstituteofAviationTechnology.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      order = await OrderThakurInstituteofAviation.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      order = await OrderThakurShyamnarayanDegreeCollege.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      order = await OrderThakurInstituteofHotelManagement.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else
      order = await Orders.find({ institute: tempInstitute }).sort({
        createdBy: -1,
      }).select("-invoice");

    if (!order) {
      res.status(400).json({
        success: false,
        message: "Order Not Found",
      });
    }

    let orders = order.filter((item) => item.approveorderaction === "Approved" && item.archived===undefined && item.ordergeneration===true);

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const changeStatus = async (req, res, next) => {
  try {
    let orderId = req.query.itemId;
    let order;
    let tempInstitute = req.params.institute;
    if (req.params.institute === "Thakur Polytechnic") {
      order = await OrderThakurPolytechnic.findById(orderId);
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      order = await OrderThakurInstituteofAviationTechnology.findById(orderId);
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      order = await OrderThakurInstituteofAviation.findById(orderId);
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      order = await OrderThakurShyamnarayanDegreeCollege.findById(orderId);
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      order = await OrderThakurInstituteofHotelManagement.findById(orderId);
    } else order = await Orders.findById(orderId);

    if (!order) {
      res.status(400).json({
        success: false,
        message: "Order Not Found",
      });
    }

    const { status } = req.body;

    order.orderStatus = status;

    await order.save();

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const moveToInwardArchive = async (req, res, next) => {
  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
  try {
    let ordertoMove;

    if (req.params.institute === "Thakur Polytechnic") {
      ordertoMove = await OrderThakurPolytechnic.find({
        inwardDate: { $lt: fifteenDaysAgo },
      });
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      ordertoMove = await OrderThakurInstituteofAviationTechnology.find({
        inwardDate: { $lt: fifteenDaysAgo },
      });
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      ordertoMove = await OrderThakurInstituteofAviation.find({
        inwardDate: { $lt: fifteenDaysAgo },
      });
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      ordertoMove = await OrderThakurShyamnarayanDegreeCollege.find({
        inwardDate: { $lt: fifteenDaysAgo },
      });
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      ordertoMove = await OrderThakurInstituteofHotelManagement.find({
        inwardDate: { $lt: fifteenDaysAgo },
      });
    } else
      ordertoMove = await Orders.find({ inwardDate: { $lt: fifteenDaysAgo } });

    ordertoMove.forEach(async (item) => {
      item.archived = true;
      await item.save();
    });

    res.status(200).json({
      success: true,
      ordertoMove,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const moveToOrderArchive = async (req, res, next) => {
  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
  try {
    // const ordertoMoveinOrderArchived = await Orders.find({verifierApprovedDate: { $lt: fifteenDaysAgo },});

    let ordertoMoveinOrderArchived;

    if (req.params.institute === "Thakur Polytechnic") {
      ordertoMoveinOrderArchived = await OrderThakurPolytechnic.find({
        verifierApprovedDate: { $lt: fifteenDaysAgo },
      });
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      ordertoMoveinOrderArchived =
        await OrderThakurInstituteofAviationTechnology.find({
          verifierApprovedDate: { $lt: fifteenDaysAgo },
        });
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      ordertoMoveinOrderArchived = await OrderThakurInstituteofAviation.find({
        verifierApprovedDate: { $lt: fifteenDaysAgo },
      });
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      ordertoMoveinOrderArchived =
        await OrderThakurShyamnarayanDegreeCollege.find({
          verifierApprovedDate: { $lt: fifteenDaysAgo },
        });
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      ordertoMoveinOrderArchived =
        await OrderThakurInstituteofHotelManagement.find({
          verifierApprovedDate: { $lt: fifteenDaysAgo },
        });
    } else
      ordertoMoveinOrderArchived = await Orders.find({
        verifierApprovedDate: { $lt: fifteenDaysAgo },
      });

    res.status(200).json({
      success: true,
      ordertoMoveinOrderArchived,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const orderArchive = async (req, res, next) => {
  try {
    // const orders=await Orders.find({}).sort({ createdBy: -1 })

    let orders;
    let tempInstitute = req.params.institute;
    if (req.params.institute === "Thakur Polytechnic") {
      orders = await OrderThakurPolytechnic.find({}).sort({ createdBy: -1 });
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      orders = await OrderThakurInstituteofAviationTechnology.find({}).sort({
        createdBy: -1,
      });
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      orders = await OrderThakurInstituteofAviation.find({}).sort({
        createdBy: -1,
      });
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      orders = await OrderThakurShyamnarayanDegreeCollege.find({}).sort({
        createdBy: -1,
      });
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      orders = await OrderThakurInstituteofHotelManagement.find({}).sort({
        createdBy: -1,
      });
    } else
      orders = await Orders.find({ institute: tempInstitute }).sort({
        createdBy: -1,
      });

    let archivedOrders = orders.filter((item) => item.orderArchived === "true");

    res.status(200).json({
      success: true,
      archivedOrders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const inventoryProducts = async (req, res, next) => {
  try {
    let orders;
    let tempInstitute = req.params.institute;
    if (req.params.institute === "Thakur Polytechnic") {
      orders = await OrderThakurPolytechnic.find({}).sort({ createdBy: -1 }).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      orders = await OrderThakurInstituteofAviationTechnology.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      orders = await OrderThakurInstituteofAviation.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      orders = await OrderThakurShyamnarayanDegreeCollege.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      orders = await OrderThakurInstituteofHotelManagement.find({}).sort({
        createdBy: -1,
      }).select("-invoice");
    } else
      orders = await Orders.find({ institute: tempInstitute }).sort({
        createdBy: -1,
      }).select("-invoice");

    let products = orders.filter((item) => item.orderStatus === "Receieved");
    products = products.filter(
      (item) => item.institute === req.params.institute
    );
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const filterOrders = async (req, res, next) => {
  try {
    let selectedCategoriesArray = [];
    const selectedCategories = req.query.selectedCategories || [];
    let user = req.query.user;
    if (selectedCategories.length > 0) {
      selectedCategoriesArray = selectedCategories.split(",");
    }
    let order;

    if (req.params.institute === "Thakur Polytechnic") {
      order = await OrderThakurPolytechnic.find({}).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      order = await OrderThakurInstituteofAviationTechnology.find({}).select("-invoice");
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      order = await OrderThakurInstituteofAviation.find({}).select("-invoice");
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      order = await OrderThakurShyamnarayanDegreeCollege.find({}).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      order = await OrderThakurInstituteofHotelManagement.find({}).select("-invoice");
    } else order = await Orders.find({ institute: tempInstitute }).select("-invoice");

    if (user === "Verifier") {
      order = order.filter((item) => item.orderaction === "none");
    } else if (user === "Approver") {
      order = order.filter(
        (item) =>
          item.approveorderaction === "none" &&
          item.remark !== undefined &&
          item.orderaction === "Approved" &&
          item.orderArchived === undefined
      );
    }

    if (selectedCategoriesArray.length > 0)
      order = order.filter(
        (item) =>
          selectedCategoriesArray.includes(item.department) ||
          selectedCategoriesArray.includes(item.lab) ||
          selectedCategoriesArray.includes(item.itemtype) ||
          selectedCategories.includes(item.orderType)
      );

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const filterOrdersofApprovedOrders = async (req, res, next) => {
  try {
    let selectedCategoriesArray = [];
    const selectedCategories = req.query.selectedCategories || [];
    if (selectedCategories.length > 0) {
      selectedCategoriesArray = selectedCategories.split(",");
    }
    let order;

    if (req.params.institute === "Thakur Polytechnic") {
      order = await OrderThakurPolytechnic.find({}).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      order = await OrderThakurInstituteofAviationTechnology.find({}).select("-invoice");
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      order = await OrderThakurInstituteofAviation.find({}).select("-invoice");
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      order = await OrderThakurShyamnarayanDegreeCollege.find({}).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      order = await OrderThakurInstituteofHotelManagement.find({}).select("-invoice");
    } else {
      order = await Orders.find({ institute: tempInstitute }).select("-invoice");
    }

    order = order.filter((item) => item.orderaction === "Approved" && item.approveorderaction==="Approved");

    if (selectedCategoriesArray.length > 0)
      order = order.filter(
        (item) =>
          selectedCategoriesArray.includes(item.department) ||
          selectedCategoriesArray.includes(item.lab) ||
          selectedCategoriesArray.includes(item.itemtype) ||
          selectedCategories.includes(item.orderType)
      );

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const filterOrdersofRejectedOrders = async (req, res, next) => {
  try {
    let selectedCategoriesArray = [];
    const selectedCategories = req.query.selectedCategories || [];
    if (selectedCategories.length > 0) {
      selectedCategoriesArray = selectedCategories.split(",");
    }
    let order;

    if (req.params.institute === "Thakur Polytechnic") {
      order = await OrderThakurPolytechnic.find({}).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      order = await OrderThakurInstituteofAviationTechnology.find({}).select("-invoice");
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      order = await OrderThakurInstituteofAviation.find({}).select("-invoice");
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      order = await OrderThakurShyamnarayanDegreeCollege.find({}).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      order = await OrderThakurInstituteofHotelManagement.find({}).select("-invoice");
    } else {
      order = await Orders.find({ institute: tempInstitute }).select("-invoice");
    }

    order = order.filter((item) => item.orderaction === "Rejected" || item.approveorderaction==="Rejected");

    if (selectedCategoriesArray.length > 0)
      order = order.filter(
        (item) =>
          selectedCategoriesArray.includes(item.department) ||
          selectedCategoriesArray.includes(item.lab) ||
          selectedCategoriesArray.includes(item.itemtype) ||
          selectedCategories.includes(item.orderType)
      );

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const filterOrdersofInwardOrders = async (req, res, next) => {
  try {
    let selectedCategoriesArray = [];
    const selectedCategories = req.query.selectedCategories || [];
    if (selectedCategories.length > 0) {
      selectedCategoriesArray = selectedCategories.split(",");
    }
    let order;

    if (req.params.institute === "Thakur Polytechnic") {
      order = await OrderThakurPolytechnic.find({}).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      order = await OrderThakurInstituteofAviationTechnology.find({}).select("-invoice");
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      order = await OrderThakurInstituteofAviation.find({}).select("-invoice");
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      order = await OrderThakurShyamnarayanDegreeCollege.find({}).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      order = await OrderThakurInstituteofHotelManagement.find({}).select("-invoice");
    } else {
      order = await Orders.find({ institute: tempInstitute }).select("-invoice");
    }

    order = order.filter(
      (item) =>
        item.approveorderaction === "Approved" && item.archived === undefined
    );

    if (selectedCategoriesArray.length > 0)
      order = order.filter(
        (item) =>
          selectedCategoriesArray.includes(item.department) ||
          selectedCategoriesArray.includes(item.lab) ||
          selectedCategoriesArray.includes(item.itemtype) ||
          selectedCategories.includes(item.orderType)
      );

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
