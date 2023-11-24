const HttpError = require("../models/http-error")
const Customer = require('../models/Customer')

const getAllCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find()
        res.json(customers)
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
      customer = await customer.findById(customerId);
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
    }
  
    res.json({ customer: customer.toObject({getters: true}) })
  };
  
  exports.getAllCustomers = getAllCustomers; 
  exports.getCustomerById = getCustomerById;