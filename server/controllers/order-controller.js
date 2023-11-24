const Order = require("../models/Order");
const HttpError = require("../models/http-error");

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    const error = new HttpError(
      "Fetch the orders failed, please try again later",
      500
    );

    next(error);
  }
};

const createOrder = async (req, res, next) => {
  const {
    name,
    creator,
    worker,
    date,
    customer,
    status,
    contact,
    description,
  } = req.body;

  const createdOrder = new Order({
    name: name,
    creator: creator,
    worker: worker,
    date: date,
    customer: customer,
    status: status,
    contact: contact,
    description: description,
  });

  try {
    await createdOrder.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }

  res.status(201).json({
    // orderId: createdOrder.id,
    name: createdOrder.name,
  });
};

const getOrderById = async (req, res, next) => {
  const orderId = req.params.orderId;

  let order;

  try {
    order = await Order.findById(orderId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a order.",
      500
    );
    return next(error);
  }

  if (!order) {
    const error = new HttpError(
      'Could not find order for the provided id.',
      404
    );
}

  res.json({ order: order.toObject({getters: true}) })
};

exports.getAllOrders = getAllOrders;
exports.createOrder = createOrder;
exports.getOrderById = getOrderById;
