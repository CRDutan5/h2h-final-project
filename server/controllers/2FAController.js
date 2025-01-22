import { generateOTP, generateOTPEmail } from "../helper/2faFunctions.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Function to send OTP
// http://localhost:5000/api/auth/login
// {
//   "email": "carlitosrdutan@gmail.com",
// "password": "123456"
// }
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOTP();

    user.otp = otp;

    await user.save();
    await generateOTPEmail(otp, email);

    return res.status(200).json({
      message: "OTP Sent Successfully",
      requiresOTP: true,
    });
  } catch (error) {
    console.error("Error Sending OTP: ", error);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
};

// http://localhost:5000/api/auth/2fa/verify
// {
//   "email": "carlitosrdutan@gmail.com",
// "inputOtp": "d8cd9c"
// }
export const verifyOTP = async (req, res) => {
  try {
    const { inputOtp, email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (inputOtp === user.otp) {
      user.otp = null;
      await user.save();
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        message: "User Authenticated!",
        token,
      });
    } else {
      user.otp = null;
      await user.save();
      return res.status(404).json({ message: "Wrong OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP: ", error);
    return res.status(500).json({ message: "Failed to verify OTP" });
  }
};
