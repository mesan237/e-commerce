import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectdb from "./config/db.js";
import cors from "cors";

import productRoutes from "./routes/product.routes.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";
connectdb();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors("http://localhost:3000/"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
