import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { constants } from "./config.js";

const app = express();

import authRouter from "./routes/auth.js";
import adRouter from "./routes/ad.js";

const PORT = process.env.PORT || 8000;

// middleware
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(cors());

mongoose
  .connect(constants.MONGO_URI)
  .then(() => console.log("mongodb Connected"));

app.use("/auth", authRouter);
app.use("/api", adRouter);

app.listen(PORT, () => console.log(`Port is running ${PORT}`));
