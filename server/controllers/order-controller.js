const Order = require("../models/Order");
const HttpError = require("../models/http-error");
const Firm = require("../models/Firm");
const Worker = require('../models/Worker')
const Customer = require('../models/Customer');
const Appointment = require("../models/Appointment");

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

// create order
const createOrder = async (req, res, next) => {
  const {
    firmId,
    name,
    creator,
    worker,
    date,
    customerId,
    status,

    street,
    houseNr,
    zip,
    place,
    description,
  } = req.body;


  const customerItem = await Customer.findOne({ _id: customerId });

  // console.log('customer item', customerItem);

  const createdOrder = new Order({
    // creator: creator, // auth.userId in frontend 
    // date: date,
    status: 1,
    firmId: firmId,
    name: name,
    worker: worker,
    description: description,

    customerId: customerId,
    street: street,
    houseNr: houseNr,
    zip: zip,
    place: place,
    c_name: customerItem.name,
  });


  await Firm.updateOne(
    { _id: firmId },
    { $push: { orders: createdOrder._id } },
  )

  await Customer.updateOne(
    { _id: customerId },
    { $push: { orders: createdOrder._id } },

  )
  try {
    await createdOrder.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not create an order.",
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
    customer,
    worker,
    contact,
    street,
    houseNr,
    zip,
    place,
    description,
    status
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
      updateOrder.c_name = customer,
      updateOrder.worker = worker,
      updateOrder.contact = contact,
      updateOrder.street = street,
      updateOrder.houseNr = houseNr,
      updateOrder.zip = zip,
      updateOrder.place = place,
      updateOrder.description = description,
      updateOrder.status = status,

      await updateOrder.save();

    // Update related appointments
    const appointments = await Appointment.find({ orderId: orderId });

    for (const appointment of appointments) {
      appointment.o_name = name;
      appointment.o_street = street;
      appointment.o_houseNr = houseNr;
      appointment.o_zip = zip;
      appointment.o_place = place;

      await appointment.save();
    }


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

// delete functionality 
const deleteOrderById = async (req, res, next) => {
  const orderId = req.params.orderId

  try {

    // delete each appointment of the order
    // Find the order to get appointment IDs
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Delete each appointment associated with the order
    for (const appointmentId of order.appointments) {
      await Appointment.deleteOne({ _id: appointmentId });
    }

    // Delete the appointment
    const deletedOrder = await Order.deleteOne({ _id: orderId });

    // Check if the appointment exists
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await Firm.findOneAndUpdate(
      { orders: orderId },
      { $pull: { orders: orderId } }
    );

    await Customer.findOneAndUpdate(
      { orders: orderId },
      { $pull: { orders: orderId } }
    );



    res.status(200).json({ message: 'Order was deleted successfully' });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete this order.",
      500
    );
    return next(error);
  }
}

// changing a status 
const statusChange = async (req, res, next) => {
  const orderId = req.params.orderId
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      // If appointment is not found, return an error
      const error = new HttpError("Order not found", 404);
      return next(error);
    }

    // Get the new status from request body
    const { newStatus } = req.body;

    // Update the status of the appointment
    order.status = newStatus;

    // Save the updated appointment
    await order.save();

    // Respond with success message
    res.status(200).json({ message: "Order status updated successfully" });


  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not change a status of this order.",
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
exports.deleteOrderById = deleteOrderById;
exports.statusChange = statusChange;