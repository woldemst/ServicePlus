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
      name,
      date,
      time,
      description,
    } = req.body;
    console.log(req.body);
    const customerItem = await Customer.findOne({ orders: { $in: [orderId] } });

    const orderItem = await Order.findOne({ _id: orderId });


    // console.log('order item ', orderItem);
    // console.log('customer item ', customerItem);

    const createdAppointment = new Appointment({
      // creator: creator, // auth.userId in frontend 
      // status: status,    

      firmId: firmId,
      orderId: orderId,
      worker: worker,
      name: name,
      date: date,
      time: time,
      status: 'new',
      description: description,

      o_street: orderItem.street,
      o_houseNr: orderItem.houseNr,
      o_zip: orderItem.zip,
      o_place: orderItem.place,
      o_name: orderItem.name,

      c_name: customerItem.name
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

// delete functionality 
const deleteAppointmentById = async (req, res, next) => {
  const appointmentId = req.params.appointmentId

  try {
    // Delete the appointment
    const deletedAppointment = await Appointment.deleteOne({ _id: appointmentId });

    // Check if the appointment exists
    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    await Order.findOneAndUpdate(
      { appointments: appointmentId },
      { $pull: { appointments: appointmentId } }
    );

    res.status(200).json({ message: 'Appointment was deleted successfully' });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete this appointment.",
      500
    );
    return next(error);
  }
}

const statusChange = async (req, res, next) => {
  const appointmentId = req.params.appointmentId
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      // If appointment is not found, return an error
      const error = new HttpError("Appointment not found", 404);
      return next(error);
    }

    // Get the new status from request body
    const { newStatus } = req.body;

    // Update the status of the appointment
    appointment.status = newStatus;

    // Save the updated appointment
    await appointment.save();

    // Respond with success message
    res.status(200).json({ message: "Appointment status updated successfully" });


  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not change a status of this appointment.",
      500
    );
    return next(error);
  }
}

exports.getAllAppointments = getAllAppointments;
exports.createAppointment = createAppointment;
exports.getAllContactsAsOptionsByFirmId = getAllContactsAsOptionsByFirmId;
exports.deleteAppointmentById = deleteAppointmentById;

exports.getAllCustomersAsOptionsBiFirmId = getAllCustomersAsOptionsBiFirmId;
exports.getAllWorkersAsOptionsByFirmId = getAllWorkersAsOptionsByFirmId;
exports.getAllOrdersAsOptionsByFirmId = getAllOrdersAsOptionsByFirmId;

exports.statusChange = statusChange;