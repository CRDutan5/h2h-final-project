import crypto from "crypto";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

export const generateOTP = (length = 6) => {
  const otp = crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
  return otp;
};

export const generateOTPEmail = async (otp, email) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: email,
    from: "carlitosdutan@pursuit.org",
    subject: "Your One-Time Pin (OTP)",
    text: `Your One-Time Pin (OTP) is ${otp}`,
    html: `<strong>Your OTP is ${otp}</strong>`,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
