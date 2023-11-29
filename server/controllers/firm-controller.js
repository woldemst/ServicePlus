const mongoose = require('mongoose');
const Firm = require("../models/Firm");
const HttpError = require("../models/http-error");

const register = async (req, res, next) => {
  // destructuring assignment from body
  const { name, owner, email, street, houseNr, zip, place, phone, website } =
    req.body;

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
    
  try {
    const updatedFirm = await Firm.findByIdAndUpdate(
      firmId,
      {
        name,
        owner,
        email,
        street,
        houseNr,
        zip,
        place,
        phone,
        website,
      },
      { new: true } // To return the updated document
    );

    if (!updatedFirm) {
      const error = new HttpError('Firm not found.', 404);
      return next(error);
    }

    res.status(200).json({ firm: updatedFirm.toObject({ getters: true }) });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update profile.',
      500
    );
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
