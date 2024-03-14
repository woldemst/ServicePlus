const Order = require("../models/Order");
const HttpError = require("../models/http-error");
const Firm = require("../models/Firm");
const Worker = require('../models/Worker')
const Customer = require('../models/Customer')

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
    res.json({ orders: orders.map(order => order.toObject({ getters: true })) })
  } catch (err) {
    const error = new HttpError(
      "Fetch the orders failed, please try again later",
      500
    );
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  // const firmId = req.params.firmId;

  const {
    firmId,
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
    firmId: firmId,
    name: name,
    // creator: creator, // auth.userId in frontend 
    // worker: worker,
    // date: date,
    // status: status,
    worker: worker,
    customer: customer,
    contact: contact,
    description: description,
  });

  await Firm.updateOne(
    { _id: firmId },
    { $push: { orders: createdOrder._id } },
  )

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
    .json({ order: createdOrder.toObject({ getters: true }) });
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

const getAllWorkersAsOptions = async (req, res, next) => {
  const firmId = req.params.firmId
  try {
    const workers = await Worker.find({ firmId: firmId });

    if (!workers || workers.length === 0) {
      const error = new HttpError(
        'Could not find workers for the provided firm id.',
        404
      );
      return next(error);
    }

    const workerList = workers.map(worker => ({
      id: worker._id,
      name: worker.name
    }))
    // res.json({
    //   workers: workers.map(worker => worker.toObject({ getters: true })),
    // });

    res.json({ workers: workerList })
  } catch (err) {
    const error = new HttpError(
      'Fetching workers failed, please try again later.',
      500
    );
    return next(error);
  }
}

const getAllCustomersAsOptions = async (req, res, next) => {
  const firmId = req.params.firmId

  try {
    const customers = await Customer.find({ firmId: firmId });

    if (!customers || customers.length === 0) {
      const error = new HttpError(
        'Could not find customers for the provided firm id.',
        404
      );
      return next(error);
    }

    const customerList = customers.map(customer => ({
      id: customer._id,
      name: customer.name
    }))

    res.json({ customers: customerList })
  } catch (err) {
    const error = new HttpError(
      'Fetching customers failed, please try again later.',
      500
    );
    return next(error);
  }
}

const getAllContactsAsOptions = async (req, res, next) => {
  const firmId = req.params.firmId;

  try {
    const contacts = await Customer.find({ firmId: firmId })

    if (!contacts || contacts.length === 0) {
      const error = new HttpError(
        'Could not find contacts for the provided firm id.',
        404
      );
      return next(error);
    }

    const contactList = contacts.map(contact => ({
      id: contact._id,
      name: contact.contact
    }))

    res.json({ contacts: contactList })
  } catch (err) {
    const error = new HttpError(
      'Fetching contacts failed, please try again later.',
      500
    );
    return next(error);
  }
}

const updateOrderById = async (req, res, next) => {
  const orderId = req.params.orderId

  const {
    name,
    email,
    contact,
    worker,
    // nextAppointment, 
    description
  } = req.body

  let updateOrder;

  try {
    updateOrder = await Order.findById(orderId)

    if (!updateOrder) {
      const error = new HttpError('Could not find an order for the provided Id.', 404);
      return next(error);
    }

    updateOrder.name = name,
    updateOrder.email = email,
    // updateOrder.nextAppointment = nextAppointment,
    updateOrder.contact = contact,
    updateOrder.worker = worker,
    updateOrder.description = description,

    await updateOrder.save();

    res
      .status(200)
      .json({ order: updateOrder.toObject({ getters: true }) });

  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update profile.",
      500
    );
    return next(error);
  }
}

exports.getAllOrdersByFirmId = getAllOrdersByFirmId;
exports.createOrder = createOrder;
exports.getOrderById = getOrderById;

exports.getAllWorkersAsOptions = getAllWorkersAsOptions;
exports.getAllCustomersAsOptions = getAllCustomersAsOptions;
exports.getAllContactsAsOptions = getAllContactsAsOptions;

exports.updateOrderById = updateOrderById;