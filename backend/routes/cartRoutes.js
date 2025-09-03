import express from "express";
import { addCart, updateCart, deleteCart } from "../controllers/cartController.js";

const router = express.Router();

// Add new cart
router.post("/", addCart);
// Update cart
router.put("/:id", updateCart);
// Delete cart
router.delete("/:id", deleteCart);

export default router;
