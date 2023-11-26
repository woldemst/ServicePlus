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
  const firmId = req.params.fid;
  const { name, owner, email, street, houseNr, zip, place, phone, website } = req.body;


//   try {
//     const updatedFirm = await Firm.findByIdAndUpdate(firmId, req.body, { new: true });
//     res.status(200).json({ firm: updatedFirm.toObject({ getters: true }) });
// } catch (err) {
//     const error = new HttpError(
//         'Something went wrong, could not update profile.',
//         500
//     )  ;
//     return next(error);
// }

  let firm;

  try {
    firm = await Firm.findById(firmId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  firm.name = name;
  firm.owner = owner; 
  firm.email = email; 
  firm.street = street; 
  firm.houseNr = houseNr; 
  firm.zip = zip; 
  firm.place = place;
  firm.phone = phone; 
  firm.website = website; 

  try {
    await firm.save()
  } catch (err) {
    const error = new HttpError(
        'Something went wrong, could not update profile.',
        500
      );
      return next()
  }

  res.status(200).json({firm: firm.toObject({getters: true})})
  // res.status(200).json(firm);
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
