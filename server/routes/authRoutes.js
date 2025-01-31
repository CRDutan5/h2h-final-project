import { Router } from "express";
import {
  register,
  login,
  getUserInfo,
  getAllUsers,
  updateUser,
} from "../controllers/authController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/user/:id", authenticateToken, getUserInfo);
authRouter.get("/allUsers", getAllUsers);
authRouter.put("/update", authenticateToken, updateUser);

export default authRouter;
