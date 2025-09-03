import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";



import authRoutes from "./backend/routes/auth.js";
import productRoutes from "./backend/routes/productRoutes.js";
import orderRoutes from "./backend/routes/orderRoutes.js";
import cartRoutes from "./backend/routes/cartRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// Health
app.get("/health", (_, res) => res.json({ ok: true }));

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shop";
const PORT = process.env.PORT || 4000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Mongo connected");
    app.listen(PORT, () => console.log(`API listening on :${PORT}`));
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
    process.exit(1);
  });
