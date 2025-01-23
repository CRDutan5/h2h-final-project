import { generateOTP, generateOTPEmail } from "../helper/2faFunctions.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// In the front end if the user passes the otp, then the token will be returned and we will set that to local storage, decode it grab the user id and set the userdetails to the decoded token by fetching it
// Function to send OTP
// http://localhost:5000/api/auth/login
// {
//   "email": "carlitosrdutan@gmail.com",
// "password": "123456"
// }

// Have to add that the user cant request otp's until lockdown is cleared [DONE]
// I need to maybe that checks if an otp has been sent already
// If a user has sent one and tried twice to enter otp. If they manage to override it in the frontend, the attempts still counters it by remaining the same count
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.lockoutUntil && Date.now() < user.lockoutUntil) {
      return res.status(401).json({
        message: "User cannot request another OTP until cool down has cleared",
      });
    }

    const otp = generateOTP();

    user.otp = otp;
    user.lockoutUntil = null;

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

    if (user.lockoutUntil && Date.now() < user.lockoutUntil) {
      const remainingTime = Math.ceil((user.lockoutUntil - new Date()) / 60000);
      return res.status(429).json({
        message: `Too many failed attempts. Please try again after ${remainingTime} minutes.`,
      });
    }

    if (inputOtp === user.otp) {
      user.otp = null;
      user.otpFailedAttempts = 0;
      user.lockoutUntil = null;
      await user.save();
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        message: "User Authenticated!",
        token,
      });
    } else {
      user.otpFailedAttempts = (user.otpFailedAttempts || 0) + 1;
      if (user.otpFailedAttempts >= 3) {
        user.lockoutUntil = new Date(Date.now() + 5 * 60 * 1000);
        user.otp = null;
        user.otpFailedAttempts = 0;
        await user.save();
        return res.status(401).json({
          message: `Too many failed attempts`,
        });
      }
      await user.save();
      return res.status(401).json({ message: "Wrong OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP: ", error);
    return res.status(500).json({ message: "Failed to verify OTP" });
  }
};
