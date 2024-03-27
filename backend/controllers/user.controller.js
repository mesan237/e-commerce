import User from "../models/user.model.js";
import asyncHandler from "../middleware/middleware.js";
import generateToken from "../utils/generate.token.js";

// @desc auth users and get tokens
// @route GET /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Invalid email or password");
  }
});
// @desc register users
// @route POST /api/users/
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { password, email, name } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(401);
    throw new Error("User already exists");
  } else {
    const user = await User.create({
      password,
      email,
      name,
    });

    if (user) {
      generateToken(res, user._id);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error("Invalid user data");
    }
  }
});

// @desc fetch a single product
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("User not found ! ");
  }
});
// @desc fetch a single product
// @route GET /api/products/:productId
// @access Public
const getUsers = asyncHandler(async (req, res) => {
  res.json("register");
});
// @desc log
// @route GET /api/registe/login
// @access Public
const updateUser = asyncHandler(async (req, res) => {});
// @desc log
// @route GET /api/registe/login
// @access Public
const getUserById = asyncHandler(async (req, res) => {});
// @desc logout&& clear cookie
// @route GET /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Successfully logged out",
  });
});
// @desc fetch a single product
// @route GET /api/products/:productId
// @access Public
const deleteUser = asyncHandler(async (req, res) => {});
// @desc update user
// @route GET /api/users/profile
// @access Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save({});

    if (updateUser) {
      res.status(200).json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error("user edit failed ! ");
    }
  } else {
    res.status(401);
    throw new Error("User not found ! ");
  }
});

export {
  getUsers,
  getUserProfile,
  registerUser,
  deleteUser,
  logoutUser,
  loginUser,
  getUserById,
  updateProfile,
  updateUser,
};
