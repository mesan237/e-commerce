import asyncHandler from "../middleware/middleware.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// protect routes

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // read the jwt from the cooie
  token = req.cookies.jwt;
  console.log(token);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token not found");
    }
  } else {
    res.status(401);
    throw new Error("Please login to access this route");
  }
});

// admin midddleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("You are not authorized to access this route as an admin");
  }
};

export { protect, admin };
