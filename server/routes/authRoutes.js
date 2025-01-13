import { Router } from "express";
import { register, login, getUserInfo } from "../controllers/authController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/user/:id", authenticateToken, getUserInfo);

export default authRouter;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzg1OGI5MGY2NDViNzg0OTU3MjY4OTgiLCJpYXQiOjE3MzY4MDU0MTUsImV4cCI6MTczNjgwOTAxNX0.7Nywja87fcsq-ARysjEg0TZ1eWli6sQpxj1EtdKEf-8
