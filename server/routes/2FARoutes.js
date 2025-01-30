import { Router } from "express";
import { removeOTP, sendOTP, verifyOTP } from "../controllers/2FAController.js";

const twoFARouter = Router();

twoFARouter.post("/send", sendOTP);
twoFARouter.post("/verify", verifyOTP);
twoFARouter.put("/remove", removeOTP);

export default twoFARouter;
