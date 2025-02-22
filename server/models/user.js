import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    zipcode: {
      type: String,
      require: true,
    },
    position: {
      type: String,
      require: true,
    },
    // In your User model
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },
    wins: {
      type: Number,
      default: 0,
    },
    losses: {
      type: Number,
      default: 0,
    },
    twoFactorEnabled: {
      type: Boolean,
      // default: false,
    },
    // twoFactorEmail: {
    //   type: String,
    // },
    otp: {
      type: String,
    },
    // otpExpiration: {
    //   type: Date,
    // },
    // otpUsed: {
    //   type: Boolean,
    //   default: false,
    // },
    otpFailedAttempts: {
      type: Number,
      default: 0,
    },
    lockoutUntil: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
