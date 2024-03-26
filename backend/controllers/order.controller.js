import Order from "../models/order.model.js";
import asyncHandler from "../middleware/middleware.js";

// @desc fetch orders
// @route POST /api/orders/
// @access Private
const addOrdersItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order Items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    try {
      const createdOrder = await order.save();
      // console.log(createdOrder);
      res.status(201).send(createdOrder);
    } catch (error) {
      console.error("Error saving order:", error);
    }
  }
});

// @desc get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc get order by Id
// @route GET /api/orders/:orderTd
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId).populate(
    "user",
    "email name"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc update order to paid
// @route PUT /api/orders/:orderTd/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
      update_time: req.body.updte_time,
    };

    const updateOrder = await order.save();
    res.status(200).json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc update order to deliver
// @route PUT /api/orders/:orderTd/deliver
// @access Private/Admin
const updateOrderToDeliver = asyncHandler(async (req, res) => {
  res.json("update order to delivered");
});

// @desc get all orders
// @route GET /api/orders/
// @access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  res.json("get all orders");
});

export {
  addOrdersItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDeliver,
  getAllOrders,
};
