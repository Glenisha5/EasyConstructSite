import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    console.log("Incoming order POST:", req.body);
    const orderData = req.body;
    // Optionally, associate with logged-in user
    if (req.user && req.user.id) {
      orderData.userId = req.user.id;
    }
    const order = await Order.create(orderData);
    console.log("Order saved to DB:", order);
    res.status(201).json({ order });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ message: "Order creation failed", error: err.message });
  }
};
