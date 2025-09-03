import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const { category, brand, search, minPrice, maxPrice, sortBy } = req.query;
    
    let query = {};
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by brand
    if (brand) {
      query.brand = brand;
    }
    
    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    let sortQuery = {};
    if (sortBy === 'price-low') {
      sortQuery.price = 1;
    } else if (sortBy === 'price-high') {
      sortQuery.price = -1;
    } else if (sortBy === 'rating') {
      sortQuery.rating = -1;
    } else {
      sortQuery.createdAt = -1; // Default: newest first
    }
    
    const products = await Product.find(query).sort(sortQuery);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product", error: err.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product added", product });
  } catch (err) {
    res.status(500).json({ message: "Failed to add product", error: err.message });
  }
};
