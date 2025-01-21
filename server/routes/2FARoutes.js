import { Router } from "express";
import { sendOTP, verifyOTP } from "../controllers/2FAController.js";

const twoFARouter = Router();

twoFARouter.post("/send", sendOTP);
twoFARouter.post("/verify", verifyOTP);

export default twoFARouter;
