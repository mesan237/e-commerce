import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
} from "../controllers/product.controller.js";
import { protect } from "../middleware/auth.middleware.js";

router.route("/").get(getProducts);
router.route("/:productId").get(getProductById);

export default router;
