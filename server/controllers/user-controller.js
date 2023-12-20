const User = require("../models/User");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
  // destructuring assignment from body
  const { name, email, password } = req.body;

  // check if a user with tre same email exists using the User model
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try agail later.",
      500
    );
    return next(error);
  }

  // creating of new user
  const createdUser = new User({
    name: name,
    email: email,
    password: password,
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    return next(err);
  }

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    password: password,
  });
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
  let isValidPassword; 
  try {
    isValidPassword = await bcrypt.compare(password, passwortDB);
    if  (password == passwortDB){
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

  let token; 

  try {
    token = jwt.sign(
      {userId: identifiedUser.id, email: identifiedUser.email },
      'supersecret_dont_share',
      {expiresIn: '1h'}
    )

  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }


  res.json({
    userId: identifiedUser.id,
    email: identifiedUser.email,
    token: token
  });
};

exports.register = register;
exports.login = login;
