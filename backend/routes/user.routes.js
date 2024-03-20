import express from "express";
const router = express.Router();
import {
  getUsers,
  getUserProfile,
  loginUser,
  getUserById,
  registerUser,
  deleteUser,
  logoutUser,
  updateProfile,
  updateUser,
} from "../controllers/user.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/logout", protect, logoutUser);
router.post("/login", loginUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateProfile);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);

export default router;
