// So far we're up to the user logging in, and is waiting for the OTP
import crypto from "crypto";

export const sendOTP = async () => {
  const generateOTP = (length = 6) => {
    const otp = crypto.randomBytes(length).toString("hex").slice(0, length);
    return otp;
  };
};

export const verifyOTP = async () => {};
