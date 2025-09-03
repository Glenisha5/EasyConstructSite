import express from "express";
import { getProducts, getProductById, addProduct } from "../controllers/productController.js";

const router = express.Router();

// Get all products
router.get("/", getProducts);

// Get single product
router.get("/:id", getProductById);

// Add product (for admin use)
router.post("/", addProduct);

export default router;
