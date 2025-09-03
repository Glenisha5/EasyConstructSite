import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
  email: { type: String, required: true },
  items: [cartItemSchema],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
