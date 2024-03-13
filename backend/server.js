import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import { products } from "./datas/products.js";

const port = process.env.PORT || 5000;
const app = express();

app.use(cors("http://localhost:3000/"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.get("/api/products/:productId", (req, res) => {
  const productId = req.params.productId;
  const product = products.find((product) => product._id === productId);
  res.send(product);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
