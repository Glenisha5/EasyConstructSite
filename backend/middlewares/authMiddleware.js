import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

export const protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Not authorized, no token" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("_id name email");
    if (!user) return res.status(401).json({ message: "Not authorized" });

    req.user = { id: user._id, name: user.name, email: user.email };
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized", error: err.message });
  }
};
