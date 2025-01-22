import { generateOTP, generateOTPEmail } from "../helper/2faFunctions.js";
import User from "../models/user.js";

// Function to send OTP
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is in cooldown period
    if (user.lockoutUntil && Date.now() < user.lockoutUntil) {
      const remainingTime = Math.ceil((user.lockoutUntil - Date.now()) / 1000);
      return res.status(403).json({
        message: `You are locked out. Please try again in ${remainingTime} seconds.`,
      });
    }

    const otp = generateOTP();
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpiration = otpExpiration;
    user.otpFailedAttempts = 0;
    user.lockoutUntil = null;

    await user.save();
    await generateOTPEmail(otp, email);

    res.status(200).json({
      message: "OTP Sent Successfully",
      expiresIn: "10 minutes",
    });
  } catch (error) {
    console.error("Error Sending OTP: ", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { inputOtp, email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.lockoutUntil && Date.now() < user.lockoutUntil) {
      const remainingTime = Math.ceil((user.lockoutUntil - Date.now()) / 1000);
      return res.status(403).json({
        message: `Too many failed attempts. Please try again in ${remainingTime} seconds.`,
      });
    }

    if (!user.otpExpiration || Date.now() > user.otpExpiration) {
      user.otp = "";
      user.otpFailedAttempts = 0;
      user.otpExpiration = null;
      await user.save();
      return res.status(400).json({
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    if (inputOtp === user.otp) {
      user.otp = "";
      user.otpExpiration = null;
      user.otpFailedAttempts = 0;
      await user.save();
      return res.status(200).json({ message: "2FA Validated" });
    }

    user.otpFailedAttempts = (user.otpFailedAttempts || 0) + 1;

    if (user.otpFailedAttempts >= 3) {
      user.lockoutUntil = new Date(Date.now() + 10 * 60 * 1000); // 10 minute cooldown
      user.otp = "";
      user.otpExpiration = null;
      user.otpFailedAttempts = 0;
      await user.save();
      return res.status(403).json({
        message: "Too many failed attempts. Please try again in 10 minutes.",
      });
    }

    await user.save();
    return res.status(400).json({
      message: `Incorrect OTP. ${
        3 - user.otpFailedAttempts
      } attempts remaining.`,
    });
  } catch (error) {
    console.error("Error verifying OTP: ", error);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
};
