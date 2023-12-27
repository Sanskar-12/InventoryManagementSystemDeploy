import express from "express";
import {
  AddaUser,
  GetAllUser,
  GetUserById,
  GetUserDetail,
  Login,
  SignUp,
  deleteUser,
  logout,
  updateUser,
} from "../controllers/User.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", Login);
router.get("/getallUser", isAuthenticated, GetAllUser);
router.get("/me", isAuthenticated, GetUserDetail);
router.post("/addaUser", isAuthenticated, AddaUser);
router.get("/user/getByID/:userId", isAuthenticated, GetUserById);
router.delete("/user/deleteUserbyId/:userId", isAuthenticated, deleteUser);
router.patch("/user/updateUserbyId/:userId", isAuthenticated, updateUser);
router.get("/logout", logout);

export default router;
