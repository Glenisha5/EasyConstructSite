import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  customerName: { type: String },
  customerEmail: { type: String },
  customerAddress: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
