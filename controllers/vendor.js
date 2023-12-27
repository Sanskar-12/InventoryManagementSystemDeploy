import { Vendors } from "../models/vendor.js";

export const AddVendor = async (req, res, next) => {
  // console.log("hiii");
  try {
    const {
      vendorName,
      billingaddress,
      companyName,
      contactPerson,
      designation,
      email,
      formationDate,
      organizationStatus,
      mobileNumber,
      officeNumber,
      panNumber,
      tanNumber,
      gstNumber,
      sign,
      gst,
      panCopy,
      tanCopy,
      originalCancelCheque,
      others,
      registerAddress,
    } = req.body;
    let institute = req.params.institute;
    const bd = {
      vendorName,
      billingaddress,
      companyName,
      contactPerson,
      designation,
      email,
      formationDate,
      organizationStatus,
      mobileNumber,
      officeNumber,
      panNumber,
      tanNumber,
      gstNumber,
      sign,
      gst,
      panCopy,
      tanCopy,
      originalCancelCheque,
      others,
      registerAddress,
      institute,
    };

    const vendor = await Vendors.create(bd);

    if (!vendor) {
      return res.status(500).json({ message: "Vendor creation failed" });
    }

    return res.status(200).json({ vendor });
  } catch (error) {
    console.error("Error adding vendor:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
export const GetAllVendor = async (req, res, next) => {
  try {
    let institute = req.params.institute;
    let vendors = await Vendors.find(
      {},
      {
        sign: 0,
        gst: 0,
        panCopy: 0,
        tanCopy: 0,
        originalCancelCheque: 0,
        others: 0,
      }
    );

    vendors = vendors.filter((v) => v.institute === institute);
    if (!vendors) {
      return res.status(500).json({ mesage: "Empty :(" });
    }

    res.status(200).json({ success: true, vendors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const GetAllVendorForRequizition = async (req, res, next) => {
  try {
    let institute = req.params.institute;
    let vendors = await Vendors.find().select(
      "-sign -gst -panCopy -tanCopy -originalCancelCheque -others"
    );

    vendors = vendors.filter((v) => v.institute === institute);
    if (!vendors) {
      return res.status(500).json({ mesage: "Empty :(" });
    }

    res.status(200).json({ success: true, vendors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const GetVendorForOrderDetailsById = async (req, res, next) => {
  try {
    let vendor = await Vendors.findById(req.params.id).select(
      "-sign -gst -panCopy -tanCopy -originalCancelCheque -others"
    );

    if (!vendor) {
      return res.status(500).json({ mesage: "No vendor exists :(" });
    }
    res.status(200).json({ success: true, vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const GetVendorById = async (req, res, next) => {
  try {
    const vendor = await Vendors.findById(req.params.id);
    // console.log(vendor);
    if (!vendor) {
      return res.status(500).json({ mesage: "No vendor exists :(" });
    }
    vendor.sign = vendor.sign.toString("base64");
    vendor.gst = vendor.gst.toString("base64");
    vendor.panCopy = vendor.panCopy.toString("base64");
    vendor.tanCopy = vendor.tanCopy.toString("base64");
    vendor.originalCancelCheque =
      vendor.originalCancelCheque.toString("base64");
    vendor.others = vendor.others.toString("base64");

    res.status(200).json({ success: true, vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const DeleteVendorById = async (req, res, next) => {
  try {
    const vendor = await Vendors.findById(req.params.id);
    if (!vendor) {
      return res.status(500).json({ mesage: "No vendor exists :(" });
    }
    await vendor.deleteOne();

    res.status(200).json({ success: true, message: "Vendor Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
