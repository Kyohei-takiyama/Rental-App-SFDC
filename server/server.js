import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

import authRouter from "./routes/auth.js";

const PORT = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb Connected"));

app.use("/auth", authRouter);

app.listen(PORT, () => console.log(`Port is running ${PORT}`));
