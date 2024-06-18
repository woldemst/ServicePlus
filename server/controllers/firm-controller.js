const mongoose = require('mongoose');
const Firm = require("../models/Firm");
const HttpError = require("../models/http-error");
const User = require('../models/User')
const Worker = require('../models/Worker')

const register = async (req, res, next) => {
  // destructuring assignment from body
  const { name, ownerName, email, role, street, houseNr, zip, place, phone, website, userId } = req.body;

  let existingFirm;

  try {
    existingFirm = await Firm.findOne({ email })

    // Check if the firm with the same email already exists
    if (existingFirm) {
      const error = new HttpError("A firm with the same email already exists.", 422);
      return next(error);
    }

    const user = await User.findById(userId)

    if (!user) {
      const error = new HttpError('User not found.', 404);
      return next(error);
    }

    // creating new firm
    const createdFirm = new Firm({
      role,
      userId,
      ownerName,
      name,
      email,
      street,
      houseNr,
      zip,
      place,
      phone,
      website,
    });

    await createdFirm.save();

    user.firmId = createdFirm.id; // Assuming firmId is the field that references the Firm model
    await user.save();

    res
      .status(201)
      .json({
        firmId: createdFirm.id,
        email: createdFirm.email,
      });

  } catch (err) {
    const error = new HttpError(
      "Registering the new firm failed, please try agail later.",
      500
    );
    return next(error);
  }
};

const updateFirm = async (req, res, next) => {
  // destructuring assignment from body
  const firmId = req.params.firmId;
  const { name, ownerName, email, street, houseNr, zip, place, phone, website } = req.body;


  let updatedFirm

  try {
    updatedFirm = await Firm.findById(firmId)

    if (!updatedFirm) {
      const error = new HttpError('Could not find firm for the provided ID.', 404);
      return next(error);
    }

    updatedFirm.name = name;
    updatedFirm.ownerName = ownerName;
    updatedFirm.email = email;
    updatedFirm.street = street;
    updatedFirm.houseNr = houseNr;
    updatedFirm.zip = zip;
    updatedFirm.place = place;
    updatedFirm.phone = phone;
    updatedFirm.website = website;

    if (req.file) {
      updatedFirm.profileImg = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }
    await updatedFirm.save();

    res.status(200).json({ firm: updatedFirm.toObject({ getters: true }) });
  } catch (err) {
    const error = new HttpError('Something went wrong, could not update profile.', 500);
    return next(error);
  }
};


const getFirmByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    // Fetch user data by ID to get the associated firmId
    const user = await User.findById(userId) || await Worker.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const firmId = user.firmId;


    // console.log(firmId);
    // Use firmId to get firm data
    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(404).json({ message: 'Firm data not found' });
    }

    res
      .json({
        firm: firm.toObject({ getters: true }),
        firmId: firm.firmId
      });

  } catch (err) {

  }
}

exports.register = register;
exports.updateFirm = updateFirm;
exports.getFirmByUserId = getFirmByUserId;
