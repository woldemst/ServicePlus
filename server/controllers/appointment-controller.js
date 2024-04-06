const HttpError = require("../models/http-error")
const Appointment = require("../models/Appointment")
const Customer = require('../models/Customer')
const Worker = require("../models/Worker")
const Order = require('../models/Order')

const getAllAppointments = async (req, res, next) => {
  const firmId = req.params.firmId;

  try {
    const appointments = await Appointment.find({ firmId: firmId });

    if (!appointments || appointments.length === 0) {
      const error = new HttpError(
        'Could not find appointments for the provided firm id.',
        404
      );
      return next(error);
    }
    res.json({ appointments: appointments.map(appointment => appointment.toObject({ getters: true })) })

  } catch (err) {
    const error = new HttpError(
      "Fetch the appointments failed, please try again later.",
      500
    )
    next(error)
  }
}

const createAppointment = async (req, res, next) => {
  try {
    const {
      // firmId,
      // creator,
      // status,
      firmId,
      orderId,
      worker,
      customer,
      name,
      date,
      time,
      description,
    } = req.body;

    const customerItem = await Customer.findOne({ orders: { $in: [orderId] } });
    const orderItem = await Order.findOne({ _id: orderId });


    // const customerData = customerItem[0]

    // console.log('order item ', orderItem);
    // console.log('customer item ', customerItem);

    const createdAppointment = new Appointment({
      // creator: creator, // auth.userId in frontend 
      // status: status,    

      firmId: firmId,
      orderId: orderId,
      worker: worker,
      customer: customer,
      name: name,
      date: date,
      time: time,
      description: description,
      
      c_street: customerItem.street, 
      c_houseNr: customerItem.houseNr,
      c_zip: customerItem.zip,
      c_place: customerItem.place,
      o_name: orderItem.name,


    });

    await createdAppointment.save()

    await Order.updateOne(
      { _id: orderId },
      { $push: { appointments: createdAppointment._id } },
    )

    res.status(201).json({
      appointment: createdAppointment.toObject({ getters: true }),
    });

  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not create an appointment.",
      500
    );
    return next(error);
  }
}

const getAllContactsAsOptionsByFirmId = async (req, res, next) => {
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

const getAllCustomersAsOptionsBiFirmId = async (req, res, next) => {
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

const getAllWorkersAsOptionsByFirmId = async (req, res, next) => {
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

const getAllOrdersAsOptionsByFirmId = async (req, res, next) => {
  const firmId = req.params.firmId
  try {
    const orders = await Order.find({ firmId: firmId });

    if (!orders || orders.length === 0) {
      const error = new HttpError(
        'Could not find orders for the provided firm id.',
        404
      );
      return next(error);
    }

    const orderList = orders.map(order => ({
      id: order._id,
      name: order.name
    }))
    // res.json({
    //   workers: workers.map(worker => worker.toObject({ getters: true })),
    // });

    res.json({ orders: orderList })
  } catch (err) {
    const error = new HttpError(
      'Fetching orders failed, please try again later.',
      500
    );
    return next(error);
  }
}

exports.getAllAppointments = getAllAppointments;
exports.createAppointment = createAppointment;
exports.getAllContactsAsOptionsByFirmId = getAllContactsAsOptionsByFirmId;
exports.getAllCustomersAsOptionsBiFirmId = getAllCustomersAsOptionsBiFirmId;
exports.getAllWorkersAsOptionsByFirmId = getAllWorkersAsOptionsByFirmId;
exports.getAllOrdersAsOptionsByFirmId = getAllOrdersAsOptionsByFirmId; 