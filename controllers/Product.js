import { Categories } from "../models/categories.js";
import Department from "../models/department.js";
import { Orders } from "../models/order.js";
import { Products } from "../models/products.js";
import ApiFeature from "../utils/apiFeatures.js";
import { ProductThakurInstituteofAviation } from "../models/productThakurInstituteofAviation.js";
import { ProductThakurInstituteofAviationTechnology } from "../models/productThakurInstituteofAviationTechnology.js";
import { ProductThakurInstituteofHotelManagement } from "../models/productThakurInstituteofHotelManagement.js";
import { ProductThakurPolytechnic } from "../models/productThakurPolytechnic.js";
import { ProductThakurShyamnarayanDegreeCollege } from "../models/productThakurShyamnarayanDegreeCollege.js";
import { OrderThakurInstituteofAviation } from "../models/orderThakurInstituteofAviation.js";
import { OrderThakurInstituteofAviationTechnology } from "../models/orderThakurInstituteofAviationTechnology.js";
import { OrderThakurInstituteofHotelManagement } from "../models/orderThakurInstituteofHotelManagement.js";
import { OrderThakurPolytechnic } from "../models/orderThakurPolytechnic.js";
import { OrderThakurShyamnarayanDegreeCollege } from "../models/orderThakurShyamnarayanDegreeCollege.js";
import moment from 'moment';
export const Product = async (req, res, next) => {
  try {
    let { department, lab, productType, items, institute, userId, type } =
      req.body.nData;
   
 

    items[0].total = items[0].unitPrice * items[0].quantity;
 
   
    if (!lab || !productType || !items || !department || !institute) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All Fields",
      });
    }

    let isProduct;
    if (req.params.institute === "Thakur Polytechnic") {
      console.log("herte")
      isProduct = await ProductThakurPolytechnic.find({
        department,
        institute,
        type,
        productType,
      });
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      isProduct = await ProductThakurInstituteofAviationTechnology.find({
        department,
        institute,
        type,
        productType,
      });
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      isProduct = await ProductThakurInstituteofAviation.find({
        department, 
        institute,
        type,
        productType,
      });
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      isProduct = await ProductThakurShyamnarayanDegreeCollege.find({
        department,
        institute,
        type,
        productType,
      });
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      isProduct = await ProductThakurInstituteofHotelManagement.find({
        department,  
        institute,
        type,
        productType,
      });
    } else
      isProduct = await Products.find({
        department,
        institute,
        type,
        productType,
      });
      
    
   
    let product;

    let v = [];
    let newProduct = [];
    let oldProduct = [];
    if (isProduct[0])
      items.forEach((p1) => {
        let x = 1;
        isProduct.forEach((element) => {
          element.items.forEach((product) => {
            if (
              p1.description == product.description &&
              p1.unitPrice == product.unitPrice
            ) {
              product.quantity = product.quantity + p1.quantity;
            
              product.total = p1.total + product.total;
              product.perInvInf.push(p1.perInvInf[0]);
              

              v.push(element);
              x = 0;
            }
          });
        });
        if (x) newProduct.push(p1);
      });

    if (!isProduct[0]) {
      if (req.params.institute === "Thakur Polytechnic") {
        product = await ProductThakurPolytechnic.create({
          department,
          lab,
          productType,
          items,
          institute,
          type,
        });
      } else if (
        req.params.institute === "Thakur Institute of Aviation Technology"
      ) {
        product = await ProductThakurInstituteofAviationTechnology.create({
          department,
          lab,
          productType,
          items,
          institute,
          type,
        });
      } else if (req.params.institute === "Thakur Institute of Aviation") {
        product = await ProductThakurInstituteofAviation.create({
          department,
          lab,
          productType,
          items,
          institute,
          type,
        });
      } else if (
        req.params.institute === "Thakur Shyamnarayan Degree College"
      ) {
        product = await ProductThakurShyamnarayanDegreeCollege.create({
          department,
          lab,
          productType,
          items,
          institute,
          type,
        });
      } else if (
        req.params.institute === "Thakur Institute of Hotel Management"
      ) {
        product = await ProductThakurInstituteofHotelManagement.create({
          department,
          lab,
          productType,
          items,
          institute,
          type,
        });
      } else {
        product = await Products.create({
          department,
          lab,
          productType,
          items,
          institute,
          type,
        });
      }
   
    } else {
      if (isProduct[0]) {
        v.forEach(async (v) => {
          if (req.params.institute === "Thakur Polytechnic") {
            const result = await ProductThakurPolytechnic.updateOne(
              { _id: v._id },
              { $set: { items: v.items } }
            );
          } else if (
            req.params.institute === "Thakur Institute of Aviation Technology"
          ) {
            const result =
              await ProductThakurInstituteofAviationTechnology.updateOne(
                { _id: v._id },
                { $set: { items: v.items } }
              );
          } else if (req.params.institute === "Thakur Institute of Aviation") {
            const result = await ProductThakurInstituteofAviation.updateOne(
              { _id: v._id },
              { $set: { items: v.items } }
            );
          } else if (
            req.params.institute === "Thakur Shyamnarayan Degree College"
          ) {
            const result =
              await ProductThakurShyamnarayanDegreeCollege.updateOne(
                { _id: v._id },
                { $set: { items: v.items } }
              );
          } else if (
            req.params.institute === "Thakur Institute of Hotel Management"
          ) {
            const result =
              await ProductThakurInstituteofHotelManagement.updateOne(
                { _id: v._id },
                { $set: { items: v.items } }
              );
          } else {
            const result = await Products.updateOne(
              { _id: v._id },
              { $set: { items: v.items } }
            );
          }
        });

        product = isProduct;
      }
      if (newProduct[0]) {
        items = newProduct;
        if (req.params.institute === "Thakur Polytechnic") {
          product = await ProductThakurPolytechnic.create({
            department,
            lab,
            productType,
            items,
            institute,
            type,
          });
        } else if (
          req.params.institute === "Thakur Institute of Aviation Technology"
        ) {
          product = await ProductThakurInstituteofAviationTechnology.create({
            department,
            lab,
            productType,
            items,
            institute,
            type,
          });
        } else if (req.params.institute === "Thakur Institute of Aviation") {
          product = await ProductThakurInstituteofAviation.create({
            department,
            lab,
            productType,
            items,
            institute,
            type,
          });
        } else if (
          req.params.institute === "Thakur Shyamnarayan Degree College"
        ) {
          product = await ProductThakurShyamnarayanDegreeCollege.create({
            department,
            lab,
            productType,
            items,
            institute,
            type,
          });
        } else if (
          req.params.institute === "Thakur Institute of Hotel Management"
        ) {
          product = await ProductThakurInstituteofHotelManagement.create({
            department,
            lab,
            productType,
            items,
            institute,
            type,
          });
        } else {
          product = await Products.create({
            department,
            lab,
            productType,
            items,
            institute,
            type,
          });
        }
      }
    }


    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getallProducts = async (req, res, next) => {
  try {
    
    let tempInstitute = req.params.institute;
 
    let products;
    if (req.params.institute === "Thakur Polytechnic") {
      products = await ProductThakurPolytechnic.find().sort({ createdBy: -1 }).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      products = await ProductThakurInstituteofAviationTechnology.find().sort({ createdBy: -1 }).select("-invoice");
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      products = await ProductThakurInstituteofAviation.find().sort({ createdBy: -1 }).select("-invoice");
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      products = await ProductThakurShyamnarayanDegreeCollege.find().sort({ createdBy: -1 }).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      products = await ProductThakurInstituteofHotelManagement.find().sort({ createdBy: -1 }).select("-invoice");
    } else products = await Products.find({ institute: tempInstitute }).sort({ createdBy: -1 }).select("-invoice");

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

export const orderToproduct = async (req, res) => {
  try {
    const { status, userId,invoice } = req.body;

    let itemId = req.query.itemId;
    let order;
    let institute = req.params.institute;
    if (req.params.institute === "Thakur Polytechnic") {
      order = await OrderThakurPolytechnic.findById(itemId);
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      order = await OrderThakurInstituteofAviationTechnology.findById(itemId);
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      order = await OrderThakurInstituteofAviation.findById(itemId);
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      order = await OrderThakurShyamnarayanDegreeCollege.findById(itemId);
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      order = await OrderThakurInstituteofHotelManagement.findById(itemId);
    } else order = await Orders.findById(itemId);


    order.orderStatus = status;
    order.invoice=invoice

    await order.save();

    let department = order.department;
    let FloorNo = order.lab - "0";
    if (FloorNo <= 100) FloorNo = 1;
    else FloorNo = FloorNo % 100;
    let LabNo = order.lab - "0";
    let lab = [{ LabNo, FloorNo }];
    let productType = order.itemtype;
    let type = order.orderType;
    // let item={description:1,quantity:2,unitPrice:3,total:6,perInvInf:[{a:1}]};
    let items = [];
    order.items.forEach((it) => {
      let item = {
        description: 1,
        quantity: 2,
        unitPrice: 3,
        total: 6,
        perInvInf: [{ a: 1 }],
      };
      item.description = it.description;
      item.quantity = it.quantity;
      item.unitPrice = it.unitPrice;
      item.total = it.quantity * it.unitPrice;
      item.perInvInf = [
        { date: order.createdBy, quantity: it.quantity, userId },
      ];
      items.push(item);
  
    });

 


    let isProduct;
    if (req.params.institute === "Thakur Polytechnic") {
      isProduct = await ProductThakurPolytechnic.find({
        department,
        
        institute,
        type,
        productType,
      });
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      isProduct = await ProductThakurInstituteofAviationTechnology.find({
        department,
        
        institute,
        type,
        productType,
      });
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      isProduct = await ProductThakurInstituteofAviation.find({
        department,
       
        institute,
        type,
        productType,
      });
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      isProduct = await ProductThakurShyamnarayanDegreeCollege.find({
        department,
        
        institute,
        type,
        productType,
      });
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      isProduct = await ProductThakurInstituteofHotelManagement.find({
        department,
        
        institute,
        type,
        productType,
      });
    } else
      isProduct = await Products.find({
        department,
       
        institute,
        type,
        productType,
      });

   isProduct=isProduct.filter((prd)=>prd.lab[0].FloorNo===lab[0].FloorNo&&prd.lab[0].LabNo===lab[0].LabNo)
  
    let product;

    let v = [];
    let newProduct = [];
    let oldProduct = [];
    if (isProduct[0]) {
  
      items.forEach((p1) => {
        let x = 1;
        isProduct.forEach((element) => {
          element.items.forEach((product) => {
            if (
              p1.description == product.description &&
              p1.unitPrice == product.unitPrice
            ) {
              product.quantity = product.quantity + p1.quantity;
              
              product.total = p1.total + product.total;
              product.perInvInf.push(p1.perInvInf[0]);
             

              v.push(element);
              x = 0;
            }
          });
        });
        if (x) newProduct.push(p1);
      });
    }


    if (!isProduct[0]) {
      let w = { department, lab, productType, items, institute, type };

      if (req.params.institute === "Thakur Polytechnic") {
        
        product = await ProductThakurPolytechnic.create({
          department,
          lab,
          productType,
          items,
          institute,
          type,
          invoice
        });
      } else if (
        req.params.institute === "Thakur Institute of Aviation Technology"
      ) {
        product = await ProductThakurInstituteofAviationTechnology.create({
          department,
          lab,
          productType,
          items,
          institute,
          type,
          invoice
        });
      } else if (req.params.institute === "Thakur Institute of Aviation") {
        product = await ProductThakurInstituteofAviation.create({
          department,
          lab,
          productType,
          items,
          institute,
          type,
          invoice
        });
      } else if (
        req.params.institute === "Thakur Shyamnarayan Degree College"
      ) {
        product = await ProductThakurShyamnarayanDegreeCollege.create({
          department,
          lab,
          productType,
          items,
          institute,
          type,
          invoice
        });
      } else if (
        req.params.institute === "Thakur Institute of Hotel Management"
      ) {
        product = await ProductThakurInstituteofHotelManagement.create({
          department,
          lab,
          productType,
          items,
          institute,
          type,
          invoice
        });
      } else {
        product = await Products.create({
          department,
          lab,
          productType,
          items,
          institute,
          type,
          invoice
        });
      }
      
    } else {
      if (isProduct[0]) {
        v.forEach(async (v) => {
          if (req.params.institute === "Thakur Polytechnic") {
            const result = await ProductThakurPolytechnic.updateOne(
              { _id: v._id },
              { $set: { items: v.items,invoice } }
            );
          } else if (
            req.params.institute === "Thakur Institute of Aviation Technology"
          ) {
            const result =
              await ProductThakurInstituteofAviationTechnology.updateOne(
                { _id: v._id },
                { $set: { items: v.items,invoice } }
              );
          } else if (req.params.institute === "Thakur Institute of Aviation") {
            const result = await ProductThakurInstituteofAviation.updateOne(
              { _id: v._id },
              { $set: { items: v.items,invoice } }
            );
          } else if (
            req.params.institute === "Thakur Shyamnarayan Degree College"
          ) {
            const result =
              await ProductThakurShyamnarayanDegreeCollege.updateOne(
                { _id: v._id },
                { $set: { items: v.items,invoice } }
              );
          } else if (
            req.params.institute === "Thakur Institute of Hotel Management"
          ) {
            const result =
              await ProductThakurInstituteofHotelManagement.updateOne(
                { _id: v._id },
                { $set: { items: v.items,invoice } }
              );
          } else {
            const result = await Products.updateOne(
              { _id: v._id },
              { $set: { items: v.items,invoice } }
            );
          }
        });

        product = isProduct;
      }
      if (newProduct[0]) {
        items = newProduct;
  
        if (req.params.institute === "Thakur Polytechnic") {
          product = await ProductThakurPolytechnic.create({
            department,
            lab,
            productType,
            items,
            institute,
            type,
            invoice
          });
        } else if (
          req.params.institute === "Thakur Institute of Aviation Technology"
        ) {
          product = await ProductThakurInstituteofAviationTechnology.create({
            department,
            lab,
            productType,
            items,
            institute,
            type,
            invoice
          });
        } else if (req.params.institute === "Thakur Institute of Aviation") {
          product = await ProductThakurInstituteofAviation.create({
            department,
            lab,
            productType,
            items,
            institute,
            type,
            invoice
          });
        } else if (
          req.params.institute === "Thakur Shyamnarayan Degree College"
        ) {
          product = await ProductThakurShyamnarayanDegreeCollege.create({
            department,
            lab,
            productType,
            items,
            institute,
            type,
            invoice
          });
        } else if (
          req.params.institute === "Thakur Institute of Hotel Management"
        ) {
          product = await ProductThakurInstituteofHotelManagement.create({
            department,
            lab,
            productType,
            items,
            institute,
            type,
            invoice
          });
        } else {
          product = await Products.create({
            department,
            lab,
            productType,
            items,
            institute,
            type,
            invoice
          });
        }
      }
    }

    

    res.status(200).json({
      success: true,
      product,
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    let products;
    if (req.params.institute === "Thakur Polytechnic") {
      products = await ProductThakurPolytechnic.findById(productId);
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      products = await ProductThakurInstituteofAviationTechnology.findById(
        productId
      );
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      products = await ProductThakurInstituteofAviation.findById(productId);
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      products = await ProductThakurShyamnarayanDegreeCollege.findById(
        productId
      );
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      products = await ProductThakurInstituteofHotelManagement.findById(
        productId
      );
    } else products = await Products.findById(productId);

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

export const editProduct = async (req, res, next) => {
  try {
    let product = await Products.findById(req.params.productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product Not Found",
      });
    }
    const { name, description, quantity, price, status, type } = req.body;
    if (req.query.categoryId) {
      let category = await Categories.findById(req.query.categoryId);
      product.categorie = category._id;
    }
    if (req.query.departmentId) {
      let department = await Department.findById(req.query.departmentId);
      product.department = department._id;
    }

    if (name) {
      product.name = name;
    }
    if (description) {
      product.description = description;
    }
    if (quantity) {
      product.quantity = quantity;
    }
    if (price) {
      product.price = price;
    }
    if (status) {
      product.status = status;
    }
    if (type) {
      product.type = type;
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product Details Updated",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res, next) => {
  try {

    const {productId}=req.query
    let product

   
    if (req.params.institute === "Thakur Polytechnic") {
      product = await ProductThakurPolytechnic.findById(productId);
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      product = await ProductThakurInstituteofAviationTechnology.findById(
        productId
      );
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      product = await ProductThakurInstituteofAviation.findById(productId);
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      product = await ProductThakurShyamnarayanDegreeCollege.findById(
        productId
      );
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      product = await ProductThakurInstituteofHotelManagement.findById(
        productId
      );
    } else product = await Products.findById(productId);



    let itemId = req.query.itemId;
    let arr = [];
    product?.items?.forEach((p) => {
      if (p._id !== itemId) arr.push(p);
    });
    if (product?.items?.length === 1) {
      await product.deleteOne();
    } else {
      if (!product) {
        return res.status(400).json({
          success: false,
          message: "Product Not Found",
        });
      }

     await Products.updateOne(
        { _id: req.query.productId },
        { $set: { items: arr } }
      );
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const filterProducts = async (req, res, next) => {
  try {
    let selectedCategoriesArray = [];
    const selectedCategories = req.query.selectedCategories || [];
    if (selectedCategories.length > 0) {
      selectedCategoriesArray = selectedCategories.split(",");
    }
    let products;

    if (req.params.institute === "Thakur Polytechnic") {
      products = await ProductThakurPolytechnic.find({}).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Aviation Technology"
    ) {
      products = await ProductThakurInstituteofAviationTechnology.find({}).select("-invoice");
    } else if (req.params.institute === "Thakur Institute of Aviation") {
      products = await ProductThakurInstituteofAviation.find({}).select("-invoice");
    } else if (req.params.institute === "Thakur Shyamnarayan Degree College") {
      products = await ProductThakurShyamnarayanDegreeCollege.find({}).select("-invoice");
    } else if (
      req.params.institute === "Thakur Institute of Hotel Management"
    ) {
      products = await ProductThakurInstituteofHotelManagement.find({}).select("-invoice");
    } else products = await Products.find({ institute: tempInstitute }).select("-invoice");

    if (selectedCategoriesArray.length > 0)
      products = products.filter(
        (item) =>
          selectedCategoriesArray.includes(item.department) ||
          item.lab.every((labs) =>
            selectedCategoriesArray.includes(String(labs.LabNo))
          ) ||
          selectedCategoriesArray.includes(item.productType)
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

export const updateItem = async (req, res, next) => {
  try {
    // Extracting information from request
    let institute = req.params.institute;
    let itemId = req.query.itemId;
    let newData = req.body.data;
    let product;
    let flag = 1;
    let isProduct;

    // Checking institute and fetching product based on institute
    if (institute === "Thakur Polytechnic") {
      product = await ProductThakurPolytechnic.findById(itemId);
    } else if (institute === "Thakur Institute of Aviation Technology") {
      product = await ProductThakurInstituteofAviationTechnology.findById(itemId);
    } else if (institute === "Thakur Institute of Aviation") {
      product = await ProductThakurInstituteofAviation.findById(itemId);
    } else if (institute === "Thakur Shyamnarayan Degree College") {
      product = await ProductThakurShyamnarayanDegreeCollege.findById(itemId);
    } else if (institute === "Thakur Institute of Hotel Management") {
      product = await ProductThakurInstituteofHotelManagement.findById(itemId);
    } else {
      product = await Products.findById(itemId);
    }

    let pIn;
    let itt;
    let tpif;

    // Finding the specific item to be updated
    product.items.forEach((data) => {
      data.perInvInf.forEach((pi) => {
        let pid = pi._id.toString();

        if (pid === req.body.data._id) {
          pIn = pi;
          itt = data;
          tpif = data.perInvInf;
        }
      });
    });
console.log(itt)
    // Extracting information from new data
    let type=newData.type;
    let productType=newData.expenseType;
    let quantity = newData.quantity - '0';
    let unitPrice = newData.unitPrice - '0';
    let userId = newData.userId;
    let description = newData.description;
     itemId = newData.itemId;
    let date;
console.log(quantity,unitPrice,userId,description)
    // Creating findings object
    const findings = {
      department: product.department,
      institute,
      productType: product.productType,
      type: product.type,
    };

    // Formatting date
    if (moment(pIn.date).format('DD-MM-YYYY') === newData.date) date = pIn.date;
    else {
      date = moment(newData.date, 'DD-MM-YYYY').format();
    }

    // Querying products based on institute
    if (institute === "Thakur Polytechnic") {
      isProduct = await ProductThakurPolytechnic.find({ ...findings });
    } else if (institute === "Thakur Institute of Aviation Technology") {
      isProduct = await ProductThakurInstituteofAviationTechnology.find({ ...findings });
    } else if (institute === "Thakur Institute of Aviation") {
      isProduct = await ProductThakurInstituteofAviation.find({ ...findings });
    } else if (institute === "Thakur Shyamnarayan Degree College") {
      isProduct = await ProductThakurShyamnarayanDegreeCollege.find({ ...findings });
    } else if (institute === "Thakur Institute of Hotel Management") {
      isProduct = await ProductThakurInstituteofHotelManagement.find({ ...findings });
    } else {
      isProduct = await Products.find({ ...findings });
    }

    // Filtering products based on certain conditions
    
    isProduct = isProduct.filter((data) => data.lab[0].LabNo === product.lab[0].LabNo && data.lab[0].FloorNo === product.lab[0].FloorNo&&productType===data.productType&&type===data.type);

    let temparr = [];

    // Iterating over matching products
    let tdata;
    isProduct.forEach((data) => {
      data.items.forEach((it) => {
        // Updating existing item in matching product
        if (it.description === description && it.unitPrice === unitPrice) {
          if (unitPrice !== itt.unitPrice || description !== itt.description||productType!=product.productType||type!=product.type) {
            it.quantity = it.quantity + quantity;
            it.perInvInf.push({ date, quantity, userId, itemId });
            let added = it.perInvInf;
            it.editedBy.push({ userId, added });
            temparr.push(data);
            tdata=data;
          }
          
        }
      });
    });

    // Saving changes to the first matching product
   
    if (temparr.length > 0){
      let newProductId = [{ productId: tdata._id }];
     console.log("here")
      // Updating editedBy field in the original item
      if (!itt.editedBy[0]) {
        itt.editedBy = [{ userId, Changed: newProductId }];
      } else {
        itt.editedBy.push({ userId, Changed: newProductId });
      
      }

      // Filtering out the old item from perInvInf
      tpif = tpif.filter((data) => data._id.toString() !== newData._id);

      // Updating quantity and total in the original item
      itt.quantity = itt.quantity - pIn.quantity;
      itt.total = itt.quantity * itt.unitPrice;
      itt.perInvInf = tpif;
      
      
      // Deleting the original product if quantity is zero or negative
      if (itt.quantity <= 0) {
        flag = 0;

        tdata.items[0].editedBy.push({ userId, oldLog: itt.editedBy });
       
        await product.deleteOne();
       
      }
      await tdata.save();



    }

    // Handling the case where no matching products were found
    if (temparr.length <= 0 && (unitPrice !== itt.unitPrice || description !== itt.description||productType!=product.productType||type!=product.type)) {
      try {
        let prod;
        let total = unitPrice * quantity;

        // Creating common product fields
        const commonProductFields = {
          department: product.department,
          institute,
          lab: product.lab,
          productType,
          type,
        };

        // Creating new item
        const newItem = {
          description,
          quantity,
          unitPrice,
          total,
          perInvInf: [{
            date,
            quantity,
            itemId,
            userId,
          }],
        };

        // Creating new product based on institute
        if (institute === "Thakur Polytechnic") {
          prod = await ProductThakurPolytechnic.create({ ...commonProductFields, items: [newItem] });
        } else if (institute === "Thakur Institute of Aviation Technology") {
          prod = await ProductThakurInstituteofAviationTechnology.create({ ...commonProductFields, items: [newItem] });
        } else if (institute === "Thakur Institute of Aviation") {
          prod = await ProductThakurInstituteofAviation.create({ ...commonProductFields, items: [newItem] });
        } else if (institute === "Thakur Shyamnarayan Degree College") {
          prod = await ProductThakurShyamnarayanDegreeCollege.create({ ...commonProductFields, items: [newItem] });
        } else if (institute === "Thakur Institute of Hotel Management") {
          prod = await ProductThakurInstituteofHotelManagement.create({ ...commonProductFields, items: [newItem] });
        } else {
          prod = await Products.create({ ...commonProductFields, items: [newItem] });
        }

        let newProductId = [{ productId: prod._id }];
     

        // Updating editedBy field in the original item
        if (!itt.editedBy[0]) {
          itt.editedBy = [{ userId, Changed: newProductId }];
        } else {
          itt.editedBy.push({ userId, Changed: newProductId });
        
        }

        // Filtering out the old item from perInvInf
        tpif = tpif.filter((data) => data._id.toString() !== newData._id);

        // Updating quantity and total in the original item
        itt.quantity = itt.quantity - pIn.quantity;
        itt.total = itt.quantity * itt.unitPrice;
        itt.perInvInf = tpif;

        // Deleting the original product if quantity is zero or negative
        if (itt.quantity <= 0) {
          flag = 0;

          prod.items[0].editedBy = { userId, oldLog: itt.editedBy };
        
          await product.deleteOne();
          await prod.save();
        }


      } catch (error) {
        console.error("Error creating product:", error);
        // Handle the error appropriately
      }
    } else {
      // Updating existing item in the original product
      itt.quantity = itt.quantity - pIn.quantity + quantity;
      itt.total = itt.quantity * itt.unitPrice;
      pIn.date = date;
      pIn.quantity = quantity;
      pIn.userId = userId;
      pIn.itemId = itemId;
      pIn.description = description;

      console.log("-=-=-=-");

      // Updating editedBy field in the original item
      if (!itt.editedBy[0]) {
        console.log("here");
        itt.editedBy = [{ userId, Added: pIn }];
      } else {
        itt.editedBy.push({ userId, Added: pIn });
      }
    }

    // Saving changes to the original product
    if (flag) await product.save();

    console.log(product);
  } catch (error) {
    // Handling errors and sending a JSON response
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

