import express from "express";
const router = express.Router();
import {
  addOrdersItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDeliver,
  getAllOrders,
} from "../controllers/order.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

router
  .route("/")
  .post(protect, addOrdersItems)
  .get(protect, admin, getAllOrders);

router.get("/myorders", protect, getMyOrders);
router.route("/:orderId").get(protect, getOrderById);
router.route("/:orderTd/deliver").put(protect, admin, updateOrderToDeliver);
router.route("/:orderId/pay").put(protect, updateOrderToPaid);

export default router;
