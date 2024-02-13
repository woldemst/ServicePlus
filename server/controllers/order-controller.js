const Order = require("../models/Order");
const HttpError = require("../models/http-error");

const getAllOrdersByFirmId = async (req, res, next) => {
  const firmId = req.params.firmId;

  try {
    const orders = await Order.find({ firmId: firmId });

    if (!orders || orders.length === 0) {
      const error = new HttpError(
          'Could not find orders for the provided firm id.',
          404
        );
        return next(error);
    }
    res.json({orders: orders.map(order => order.toObject({getters: true}))})
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
    const error = new HttpError(
      "Something went wrong, could not create order.",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ name: createdOrder.name });
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

  res.json({ order: order.toObject({ getters: true }) })
};

exports.getAllOrdersByFirmId = getAllOrdersByFirmId;
exports.createOrder = createOrder;
exports.getOrderById = getOrderById;
