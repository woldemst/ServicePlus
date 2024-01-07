const mongoose = require('mongoose');
const Firm = require("../models/Firm");
const HttpError = require("../models/http-error");
const User = require('../models/User')

const register = async (req, res, next) => {
  // destructuring assignment from bod
  const { name, email, street, houseNr, zip, place, phone, website, userId} = req.body;

  let existingFirm;

  try {
    existingFirm = await Firm.findOne({ email })
    console.log(existingFirm);
  } catch (err) {
    const error = new HttpError(
      "Registering the new firm failed, please try agail later.",
      500
    );
    return next(error);
  }

  try {
    const user = await User.findById(userId)
    if (!user) {
      const error = new HttpError('User not found.', 404);
      return next(error);
    }

    // creating new firm
    const createdFirm = new Firm({
      name,
      email,
      street,
      houseNr,
      zip,
      place,
      phone,
      website,
      userId
    });

    await createdFirm.save();

    user.firmId = createdFirm._id; // Assuming firmId is the field that references the Firm model
    await user.save();

    res.status(201).json({
      firmId: createdFirm.id, 
      email: createdFirm.email,
    });

  } catch (err) {
    return next(err);
  }
};

const updateFirm = async (req, res, next) => {
  // destructuring assignment from body
  const firmId = req.params.firmId;
  const { name, owner, email, street, houseNr, zip, place, phone, website } = req.body;


  let updatedFirm

  try {
    updatedFirm = await Firm.findById(firmId)

    if (!updatedFirm) {
      const error = new HttpError('Could not find firm for the provided ID.', 404);
      return next(error);
    }
  
    updatedFirm.name = name,
    updatedFirm.owner = owner,
    updatedFirm.email = email,
    updatedFirm.street = street,
    updatedFirm.houseNr = houseNr,
    updatedFirm.zip = zip,
    updatedFirm.place = place,
    updatedFirm.phone = phone,
    updatedFirm.website = website,
  
    await updatedFirm.save();
  
    res.status(200).json({ firm: updatedFirm.toObject({ getters: true }) });
  } catch (err) {
    const error = new HttpError('Something went wrong, could not update profile.', 500);
    return next(error);
  }
};

const getFirmProfile = async (req, res, next) => {
  const firmId = req.params.firmId;
  try {
    const firm = await Firm.find();
    res.json(firm);
  } catch (err) {
    const error = new HttpError(
      "Fetch the firm failed, please try again later",
      500
    );
    next(error);
  }
};

const getFirmByUserId = async (req, res, next) => {
  const userId = req.params.userId;  



  try {
    const userWithFirm = await User.findById(userId).populate('firm');

    if (!userWithFirm || !userWithFirm.firm) {
      return next(new HttpError('Could not find firm for the provided user ID.', 404));
    }

    res.status(200).json({ firm: userWithFirm.firm.toObject({ getters: true }) });
  } catch (err) {
    const error = new HttpError('Fetching firm failed, please try again later.', 500);
    return next(error);
  }

  // let form;
  // let userWithFirm;
  // try {
  //   userWithFirm = await User.findById(userId).populate('firm');
  // } catch (err) {
  //   const error = new HttpError(
  //     'Fetching firm failed, please try again later.',
  //     500
  //   );
  //   return next(error);
  // }

  // // if (!form || form.length === 0) {
  // if (!userWithFirm || userWithFirm.form.length === 0) {
  //   return next(
  //     new HttpError('Could not find form for the provided firm id.', 404)
  //   );
  // }

  // res
  //   .status(201)
  //   .json({ form: userWithFirm.form.toObject({ getters: true }) });

}

exports.register = register;
exports.updateFirm = updateFirm;
exports.getFirmProfile = getFirmProfile;
exports.getFirmByUserId = getFirmByUserId;
