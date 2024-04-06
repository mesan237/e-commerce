import Product from "../models/product.model.js";
import asyncHandler from "../middleware/middleware.js";

// @desc fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = req.query.pageNumber && req.query.keyword ? 8 : 0;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getTopProducts = asyncHandler(async (req, res) => {
  const topProducts = await Product.find({}).sort({ rating: -1 }).limit(3);
  if (topProducts) {
    res.status(200).json(topProducts);
  } else {
    res.status(404);
    throw new Error("fetch issues");
  }
});

// @desc fetch a single product
// @route GET /api/products/:productId
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
// @desc update a product
// @route PUT /api/product/:id
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    description,
    countInStock,
    price,
    brand,
    rating,
    numReviews,
  } = req.body;

  const product = await Product.findById(req.params.productId);

  if (product) {
    product.name = name || product.name;
    product.image = image || product.image;
    product.description = description || product.description;
    product.countInStock = countInStock || product.countInStock;
    product.price = price || product.price;
    product.brand = brand || product.brand;
    product.rating = rating || product.rating;
    product.numReviews = numReviews || product.numReviews;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc create a product
// @route POST /api/product/:id
// @access Private
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "NVIDIA Jetson Nano",
    image: "/src/assets/images/nvidia_jetson_nano.png",
    description:
      "A small, powerful computer designed specifically for learning and developing AI and robotics, powered by an NVIDIA GPU.",
    brand: "NVIDIA",
    category: "AI Development Kit",
    price: 5813,
    countInStock: 143,
    rating: 4.4,
    numReviews: 72,
  });

  const createdProduct = await product.save();
  res.status(201).json(createProduct);
  // const {
  //   name,
  //   image,
  //   description,
  //   countInStock,
  //   price,
  //   brand,
  //   rating,
  //   numReviews,
  // } = req.body;

  // try {
  //   const product = await Product.create({
  //     name,
  //     image,
  //     description,
  //     countInStock,
  //     price,
  //     brand,
  //     rating,
  //     numReviews,
  //   });
  //   if (product) {
  //     res.status(201);
  //     res.json(product);
  //   } else {
  //     res.status(400);
  //     throw new Error("Product creation failed");
  //   }
  // } catch (error) {
  //   res.status(400);
  //   throw new Error(error.message);
  // }
});

// @desc delete a product
// @route DELETE /api/product/:id
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);

  if (product) {
    const deletedProduct = await product.deleteOne({ _id: product._id });
    if (deletedProduct) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404);
      console.log("deletion failed");
      throw new Error("Deletion failed");
    }
  } else {
    res.status(404);
    console.log("Product not found");
    throw new Error("Product not found");
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.productId);

  if (product) {
    const alreadyReviewed = await Product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("You have already reviewed this product");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export {
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProduct,
  createProductReview,
  getTopProducts,
};
