import Cart from "../models/Cart.js";

export const addCart = async (req, res) => {
  try {
    console.log("Incoming cart POST:", req.body);
    const { email, items, total } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });
    // Upsert: update if exists, else create
    const cart = await Cart.findOneAndUpdate(
      { email },
      { items, total },
      { new: true, upsert: true }
    );
    console.log("Cart upserted to DB:", cart);
    res.status(201).json({ cart });
  } catch (err) {
    console.error("Cart creation error:", err);
    res.status(500).json({ message: "Cart creation failed", error: err.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cartData = req.body;
    const cart = await Cart.findByIdAndUpdate(id, cartData, { new: true });
    res.status(200).json({ cart });
  } catch (err) {
    res.status(500).json({ message: "Cart update failed", error: err.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);
    res.status(200).json({ message: "Cart deleted" });
  } catch (err) {
    res.status(500).json({ message: "Cart deletion failed", error: err.message });
  }
};
