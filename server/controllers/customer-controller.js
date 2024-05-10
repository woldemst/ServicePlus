const HttpError = require("../models/http-error")
const Customer = require('../models/Customer')
const Firm = require('../models/Firm')

const getAllCustomersByFirmId = async (req, res, next) => {
  const firmId = req.params.firmId;

  try {
    const customers = await Customer.find({ firmId: firmId });

    if (!customers || customers.length === 0) {
      const error = new HttpError(
        'Could not find customers for the provided firm id.',
        404
      );
      return next(error);
    }
    res.json({ customers: customers.map(customer => customer.toObject({ getters: true })) })
  } catch (err) {
    const error = new HttpError(
      "Fetch the customers failed, please try again later.",
      500
    )
    next(error)
  }
}

const getCustomerById = async (req, res, next) => {
  const customerId = req.params.customerId;

  let customer;

  try {
    customer = await Customer.findById(customerId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a customer.",
      500
    );
    return next(error);
  }

  if (!customer) {
    const error = new HttpError(
      'Could not find customer for the provided id.',
      404
    );
    return next(error)
  }

  res.json({ customer: customer.toObject({ getters: true }) })
};

const updateCustomerById = async (req, res, next) => {
  const customerId = req.params.customerId

  const {
    name,
    email,
    customerNr,
    organisation,
    street,
    houseNr,
    zip,
    place,
    phone,
    mobilePhone,
    contact,
    worker,
    nextAppointment,
    website,
    description
  } = req.body

  let updatedCustomer;

  try {
    updatedCustomer = await Customer.findById(customerId)

    if (!updatedCustomer) {
      const error = new HttpError('Could not find customer for the provided ID.', 404);
      return next(error);
    }

    updatedCustomer.name = name,
      updatedCustomer.email = email,
      updatedCustomer.customerNr = customerNr,
      updatedCustomer.organisation = organisation,
      updatedCustomer.nextAppointment = nextAppointment,
      updatedCustomer.mobilePhone = mobilePhone,
      updatedCustomer.contact = contact,
      updatedCustomer.worker = worker,
      updatedCustomer.description = description,
      updatedCustomer.street = street,
      updatedCustomer.houseNr = houseNr,
      updatedCustomer.zip = zip,
      updatedCustomer.place = place,
      updatedCustomer.phone = phone,
      updatedCustomer.website = website,

      await updatedCustomer.save();

    res
      .status(200)
      .json({ customer: updatedCustomer.toObject({ getters: true }) });

  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update profile.",
      500
    );
    return next(error);
  }
}

const createCustomer = async (req, res, next) => {
  // const firmId = req.params.firmId; 

  const {
    firmId,
    // customerNr, 
    // organisation, 
    // worker, 
    name,
    email,
    street,
    houseNr,
    zip,
    place,
    phone,
    contact,
    nextAppointment,
    website,
    description
  } = req.body


  const createCustomer = new Customer({
    firmId: firmId,
    // customerNr: customerNr, 
    // organisation: organisation, 
    // worker: worker, 
    name: name,
    email: email,
    street: street,
    houseNr: houseNr,
    zip: zip,
    place: place,
    phone: phone,
    contact: contact,
    nextAppointment: nextAppointment,
    website: website,
    description: description
  })

  try {
    await createCustomer.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not create profile.",
      500
    );
    return next(error);
  }

  await Firm.updateOne(
    { _id: firmId },
    { $push: { customers: createCustomer._id } },
  )

  res
    .status(201)
    .json({ customer: createCustomer.toObject({ getters: true }) });
}

// delete functionality 
const deleteCustomerById = async (req, res, next) => {
  const { customerId, firmId } = req.params
  try {
    // First, find the customer to check if it exists
    const customer = await Customer.findById(customerId);

    // If customer does not exist, return an error
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // If customer exists, proceed to delete
    await Customer.deleteOne({ _id: customerId });

    await Firm.findOneAndUpdate(
      { _id: firmId },
      { $pull: { customers: customerId } }
    );

    res.status(200).json({ message: 'Customer was deleted successfully' });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete this appointment.",
      500
    );
    return next(error);
  }
}

exports.getAllCustomersByFirmId = getAllCustomersByFirmId;
exports.getCustomerById = getCustomerById;
exports.updateCustomerById = updateCustomerById;
exports.createCustomer = createCustomer;
exports.deleteCustomerById = deleteCustomerById;