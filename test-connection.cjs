const mongoose = require("mongoose");

const uri = "mongodb+srv://glenishadsouza:glenisha12345@cluster0.tk0ht9r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, { dbName: "EasyConstruct" })
  .then(async () => {
    const products = await mongoose.connection.db.collection("Products").find({}).toArray();
    console.log("Products found:", products.length);
    console.log(products);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Connection error:", err);
    process.exit(1);
  });