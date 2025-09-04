import mongoose, { Schema } from "mongoose";

const ShopSchema = new Schema({}, { strict: false }); // Accept any fields

export const Shop = mongoose.models.Shop || mongoose.model("Shop", ShopSchema, "Products");