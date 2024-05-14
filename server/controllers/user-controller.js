const User = require("../models/User");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const Firm = require('../models/Firm')
const Worker = require('../models/Worker')

const register = async (req, res, next) => {
  const { name, email, password, admin } = req.body;

  let existingUser;
  let existingWorker
  try {
    existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).json({ message: 'User exists already, please login instead.' });
    }


    existingWorker = await Worker.findOne({ email })
    // console.log(existingWorker);

    if (existingWorker) {
      return res.status(403).json({ message: 'User already registered as non-admin. Please log in instead.' });
    }



    const hashedPassword = await bcrypt.hash(password, 12);
    const createdUser = new User({ name, email, password, admin });
    await createdUser.save();

    let firmId




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
  try {
    // Attempt to find a User or Worker by email
    let identifiedPerson = await User.findOne({ email }) || await Worker.findOne({ email });

    // console.log(identifiedPerson) 
    if (!identifiedPerson) {
      const error = new HttpError("Invalid credentials, could not log you in.", 401);
      return next(error);
    }

    // Debugging output
    // Compare the provided password with the stored hash
    // const isValidPassword = await bcrypt.compareSync(password.trim(), identifiedPerson.password.trim());
    const isValidPassword = password.trim() === identifiedPerson.password.trim() ? true : false

    // console.log(`Password valid: ${isValidPassword}`); 
    if (!isValidPassword) {
      const error = new HttpError("Invalid credentials, could not log you in.", 403);
      return next(error);
    }

    // Find the firm if the person is a User and has a firmId
    // let firm;
    // if (identifiedPerson.firmId) {
    //   firm = await Firm.findById(identifiedPerson.firmId);
    //   if (!firm) {
    //     console.log('Firm not found. User does not have a firm');
    //   }
    // }

    // Sign a new token
    const token = jwt.sign(
      { userId: identifiedPerson.id, email: identifiedPerson.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );

    // Respond with the user or worker's details
    res.json({
      admin: identifiedPerson.admin || false,
      firmId: identifiedPerson.firmId || null,
      userId: identifiedPerson.id,
      email: identifiedPerson.email,
      token: token,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError("Logging in failed, please try again later.", 500);
    return next(error);
  }
};

exports.register = register;
exports.login = login;
