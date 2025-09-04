import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://glenishadsouza:glenisha12345@cluster0.tk0ht9r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI, {
    dbName: "EasyConstruct",
  });
}