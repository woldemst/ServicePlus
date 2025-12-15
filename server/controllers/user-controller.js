const User = require("../models/User");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const Firm = require('../models/Firm')
const Worker = require('../models/Worker')

const normalizeEmail = (value = '') => value.trim().toLowerCase();
const escapeRegExp = (value = '') => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const emailQuery = (email) => ({ email: { $regex: `^${escapeRegExp(email)}$`, $options: 'i' } });

const register = async (req, res, next) => {
  const { name, email, password, admin } = req.body;
  const normalizedEmail = normalizeEmail(email);
  const trimmedPassword = password?.trim() ?? '';

  try {
    if (!name || !normalizedEmail || !trimmedPassword) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    console.log('register request', { email: normalizedEmail });
    const existingUser = await User.findOne(emailQuery(normalizedEmail));
    if (existingUser) {
      return res.status(422).json({ message: 'User exists already, please login instead.' });
    }

    const hashedPassword = await bcrypt.hash(trimmedPassword, 12);
    const createdUser = new User({ name, email: normalizedEmail, password: hashedPassword, admin });
    await createdUser.save();

    let firmId

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
    console.error('register error', err);
    const status = err?.code === 11000 ? 422 : 400;
    return res.status(status).json({ message: err.message || 'Signing up failed, please try again later.' });
  }
};

const login = async (req, res, next) => {
  const normalizedEmail = normalizeEmail(req.body.email);
  const passwordInput = req.body.password?.trim() ?? '';
  try {
    // Attempt to find a User or Worker by email
    let identifiedPerson = await User.findOne(emailQuery(normalizedEmail)) || await Worker.findOne(emailQuery(normalizedEmail));

    // console.log(identifiedPerson) 
    if (!identifiedPerson) {
      const error = new HttpError("Invalid credentials, could not log you in.", 401);
      return next(error);
    }

    
    
    // Compare the provided password with the stored hash
    const isValidPassword = await bcrypt.compare(passwordInput, identifiedPerson.password)
    // const isValidPassword = password.trim() === identifiedPerson.password.trim() ? true : false

    console.log(identifiedPerson.password);
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
