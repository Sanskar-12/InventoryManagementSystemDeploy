import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import DepartmentThakurInstituteofAviation from "../models/departmentThakurInstituteofAviation.js";
import DepartmentThakurInstituteofAviationTechnology from "../models/departmentThakurInstituteofAviationTechnology.js";
import DepartmentThakurInstituteofHotelManagement from "../models/departmentThakurInstituteofHotelManagement.js";
import DepartmentThakurPolytechnic from "../models/departmentThakurPolytechnic.js";
import DepartmentThakurShyamnarayanDegreeCollege from "../models/departmentThakurShyamnarayanDegreeCollege.js";
import Department from "../models/department.js";
export const SignUp = async (req, res, next) => {
  try {
    const { username, password, user_level } = req.body;

    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    user = await User.create({
      username,
      password,
      user_level,
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill the required details",
      });
    }
    const user = await User.findOne({ "user_detail.username": username });
    // console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exists",
      });
    }
    let token = await user.generateToken();
    // console.log("token :" + token);
    // console.log(user.user_detail.password);
    // const isMatch = user.user_detail.password === password;
    // console.log(user);
    const isMatch = await user.MatchPassword(password);
    // console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }
    // console.log("checkpoint 2");

    // const options = {
    //   httpOnly: true,
    //   maxAge: 1 * 60 * 60 * 1000,
    //   sameSite:process.env.NODE_ENV==="Development" ? "lax":"none",
    //   secure:process.env.NODE_ENV==="Development" ? false:true,
    // };

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    // console.log("checkpoint 3");
    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      message: "Logged In",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetUserDetail = async (req, res, next) => {
  try {


    let user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetAllUser = async (req, res, next) => {
  try {
    let users = await User.find({});

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// export const AddaUser = async (req, res, next) => {
//   try {
//     const { username, password, user_level, image } = req.body;

//     if (req.user.user_level !== "Superuser") {
//       return res.status(200).json({
//         success: false,
//         message: "You are not authorised admin",
//       });
//     }

//     await User.create({
//       username,
//       password,
//       user_level,
//       image,
//     });

//     res.status(200).json({
//       success: true,
//       message: "User Added",
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const AddaUser = async (req, res, next) => {
  try {
    // console.log(req.body);
    let {
      dashboard,
      inventory,
      inward,
      requisition,
      institute_management,
      order_generation,
      institute_management_access,
      departmet_management_acess,
      labs_management_acess,
      user_access_role,
      user_detail,
    } = req.body;

    // if (req.user.user_access_role !== "Super_Admin") {
    //   return res.status(403).json({
    //     success: false,
    //     message: "You are not authorized to add a user.",
    //   });
    // }
    const { password, ...userDetailWithoutPassword } = user_detail;
   

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(institute_management_access)
    if(!departmet_management_acess)departmet_management_acess=[]
    if(!labs_management_acess)labs_management_acess=[]
    let department;
    if(institute_management_access==="Thakur Polytechnic")
    {
      department=await  DepartmentThakurPolytechnic.find({})
    }
    else if(institute_management_access==="Thakur Institute of Aviation Technology")
    {
      department=await DepartmentThakurInstituteofAviationTechnology.find({})
    }
    else if(institute_management_access==="Thakur Institute of Aviation")
    {
      department=await DepartmentThakurInstituteofAviation.find({})
    }
    else if(institute_management_access==="Thakur Shyamnarayan Degree College")
    {
      department=await DepartmentThakurShyamnarayanDegreeCollege.find({})
    }
    else if(institute_management_access==="Thakur Institute of Hotel Management")
    {
      department=await DepartmentThakurInstituteofHotelManagement.find({})
    }
    else
    department=await Department.find({institute:institute_management_access})

   

    if(departmet_management_acess.length===0)//verifier and approver
    {
      
    department.forEach((department)=>{
      departmet_management_acess.push(department.name);
    let td={department:department.name,labs:department.labs}
      labs_management_acess.push(td)
    })
    }
   console.log(departmet_management_acess)
    if(labs_management_acess.length===0)//hod or verifier and approver
    {
      
      let t2=[];
      departmet_management_acess.forEach((dpt)=>{
        let t1=[];
        t1=department.filter((dept)=>dept.name===dpt)
        t2.push(t1)
      }
        );
        department=[]
       t2.forEach((data)=>{
        data.forEach((data)=>{
          department.push(data)
        })
        
       })
      console.log(department)
      department.forEach((department)=>{
      let td={department:department.name,labs:department.labs}
        labs_management_acess.push(td)
      })
    }
    // console.log(labs_management_acess)


    const newUser = await User.create({
      dashboard,
      inventory,
      inward,
      requisition,
      institute_management,
      order_generation,
      institute_management_access,
      departmet_management_acess,
      labs_management_acess,
      user_access_role,
      user_detail: {
        ...userDetailWithoutPassword,
        password: hashedPassword,
      },

    });

    await newUser.save();
    // console.log("Naya user dekh");
    // console.log(newUser);
    res.status(201).json({
      success: true,
      message: "User Added",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const GetUserById = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.userId);
    console.log(user);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .status(200)
      // .cookie("token", null, {
      //   expires: new Date(Date.now()),
      //   sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      //   secure: process.env.NODE_ENV === "Development" ? false : true,
      // })
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged Out",
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// export const updateUser = async (req, res, next) => {
//   try {
//     console.log(req.body);
//     const { id } = req.body;
//     const updatedData = req.body.updatedData;

//     const user = await User.findByIdAndUpdate(id, updatedData, { new: true });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     return res.status(200).json({ user });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };

export const deleteUser = async (req, res, next) => {
  try {
    // console.log("id ye hau" + req.params.userId);
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    // console.log(deletedUser);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: deletedUser + "  deleted",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateUser = async (req, res, next) => {
  try {
    // console.log(req.params.userId, req.body);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
