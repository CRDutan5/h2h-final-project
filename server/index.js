import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import teamRouter from "./routes/teamRoutes.js";
import twoFARouter from "./routes/2FARoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

dbConnect();

const corsOption = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOption));
app.use("/api/auth", authRouter);
app.use("/api/auth/2fa", twoFARouter);
app.use("/api/teams", teamRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("Server Running on port", PORT);
});
