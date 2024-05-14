const User = require("../models/User");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const Firm = require('../models/Firm')
const Worker = require('../models/Worker')

const register = async (req, res, next) => {
  const { name, email, password, admin } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).json({ message: 'User exists already, please login instead.' });
    }

    let existingWorker

    if (!admin) {
      existingWorker = await Worker.findOne({ email })
      // console.log(existingWorker);

      if (existingWorker) {
        return res.status(403).json({ message: 'User already registered as non-admin. Please log in instead.' });
      }
    }
    
   
    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = new User({
      name,
      email,
      // password: hashedPassword,
      password,
      admin,
    });

    let firmId



    await createdUser.save();

    // await Firm.updateOne(
    //   { _id: firmId },
    //   { $push: { orders: createdOrder._id } },
    // )

    let token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );

    res
      .status(201)
      .json({
        userId: createdUser.id,
        firmId: firmId,
        email: createdUser.email,
        token,
        admin
      });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let identifiedUser;

  try {
    // find user by email
    identifiedUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );

    return next(error);
  }

  if (!identifiedUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  const passwortDB = identifiedUser.password;

  // compare the password
  let isValidPassword
  try {
    isValidPassword = await bcrypt.compare(password, passwortDB);
    if (password == passwortDB) {
      isValidPassword = true
    }

  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }


  const firmId = identifiedUser.firmId
  const firm = await Firm.findById(firmId)

  if (!firm) {
    console.log('Firm not found. User does not have a firm');
  }

  let token;

  try {
    token = jwt.sign(
      { userId: identifiedUser.id, email: identifiedUser.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    )

  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  const userRole = identifiedUser.admin


  res.json({
    admin: userRole,
    firmId: firmId,
    userId: identifiedUser.id,
    email: identifiedUser.email,
    token: token,
  });
};

exports.register = register;
exports.login = login;
