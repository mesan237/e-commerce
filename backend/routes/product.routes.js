import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../controllers/product.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/:productId")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
