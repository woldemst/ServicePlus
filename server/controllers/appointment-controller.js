const HttpError = require("../models/http-error")
const Appointment = require("../models/Appointment")
const Customer = require('../models/Customer')
const Worker = require("../models/Worker")

const getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
    res.json(appointments)
  } catch (err) {
    const error = new HttpError(
      "Fetch the appointments failed, please try again later.",
      500
    )
    next(error)
  }
}

const createAppointment = async (req, res, next) => {

  const {
    // firmId,
    // creator,
    // status,

    order,
    worker,
    customer,
    name,
    date,
    startTime,
    finishTime,
    description,
  } = req.body;


  const createdAppointment = new Appointment({
    // firmId: firmId,
    // creator: creator, // auth.userId in frontend 
    // status: status,
    order: order,
    worker: worker,
    customer: customer,
    name: name,
    date: date,
    startTime: startTime,
    finishTime: finishTime,
    description: description,
  });
  try {
    await createdAppointment.save()
    res.status(201).json({ appointment: createdAppointment.toObject({ getters: true }) }); // Send a response indicating success

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


exports.getAllAppointments = getAllAppointments;
exports.createAppointment = createAppointment;
exports.getAllContactsAsOptionsByFirmId = getAllContactsAsOptionsByFirmId;
exports.getAllCustomersAsOptionsBiFirmId = getAllCustomersAsOptionsBiFirmId; 
exports.getAllWorkersAsOptionsByFirmId = getAllWorkersAsOptionsByFirmId;