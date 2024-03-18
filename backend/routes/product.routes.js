import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
} from "../controllers/product.cotroller.js";

router.route("/").get(getProducts);
router.route("/:productId").get(getProductById);

export default router;
