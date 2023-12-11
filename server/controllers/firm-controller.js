const mongoose = require('mongoose');
const Firm = require("../models/Firm");
const HttpError = require("../models/http-error");

const register = async (req, res, next) => {
  // destructuring assignment from bod
  console.log('request body');
  console.log(req.body);  
  const { name, owner, email, street, houseNr, zip, place, phone, website } = req.body;

  let existingFirm;

  try {
    existingFirm = await Firm.findOne({ email }); 
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try agail later.",
      500
    );
    return next(error);
  }

  // creating new firm
  const createdFirm = new Firm({
    name,
    owner,
    email,
    street,
    houseNr,
    zip,
    place,
    phone,
    website,
  });

  try {
    await createdFirm.save();
  } catch (err) {
    return next(err);
  }

  res.status(201).json({
    firmId: createdFirm.id, 
    email: createdFirm.email,
  });
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

exports.register = register;
exports.updateFirm = updateFirm;
exports.getFirmProfile = getFirmProfile;
