const HttpError = require("../models/http-error")
const Customer = require('../models/Customer')

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
      res.json({customers: customers.map(customer => customer.toObject({getters: true}))})
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
  
    res.json({ customer: customer.toObject({getters: true}) })
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
   const {
    name, 
    email, 
    // customerNr, 
    // organisation, 
    street, 
    houseNr, 
    zip, 
    place, 
    phone, 
    contact, 
    // worker, 
    nextAppointment, 
    website,  
    description 
  } = req.body
  

  const createCustomer = new Customer({
    name: name, 
    email: email, 
    // customerNr: customerNr, 
    // organisation: organisation, 
    street: street, 
    houseNr: houseNr, 
    zip: zip, 
    place: place, 
    phone: phone, 
    contact: contact, 
    // worker: worker, 
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

  res
    .status(201)
    .json({ customer: createCustomer.toObject({ getters: true }) });
}

exports.getAllCustomersByFirmId = getAllCustomersByFirmId; 
exports.getCustomerById = getCustomerById;
exports.updateCustomerById = updateCustomerById;
exports.createCustomer = createCustomer;