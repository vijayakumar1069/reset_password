const ADMIN = require("../models/admin.model.js");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const errorHandler = require("../utils/errorHandler.js");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vijay.r20799@gmail.com",
    pass: "cetr ghcn azyg wpgy",
  },
});

const generateRandomString = () => crypto.randomBytes(20).toString("hex");

const signupfunction = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(errorHandler(404, "User Must Fill All Fields"));
  }

  const existingUser = await ADMIN.findOne({ email });

  if (existingUser) {
    return next(errorHandler(404, "User Already Exists"));
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const creatingRandomString = generateRandomString();

    const newAdmin = new ADMIN({
      name,
      email,
      password: hashedPassword,
      randomString: creatingRandomString,
    });

    await newAdmin.save();

    const verificationLink = `http://localhost:5173/verify/${newAdmin._id}/${creatingRandomString}`;
    const mailOptions = {
      from: "vijay.r20799@gmail.com",
      to: email,
      subject: "Account Verification",
      text: `Click the following link to verify your account: ${verificationLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: error.toString() });
      }

      console.log("Email sent:", info.response);
      res.status(200).json({ result: "Verification email sent" });
    });
  } catch (error) {
    next(error);
  }
};
const verifyfunction = async (req, res, next) => {
  const { id, token } = req.params;
  const user = await ADMIN.findById(id);
  user.isVerified = true;

  await user.save();
  res.status(200).json({ result: "success" });
};
const loginfunction = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(404, "User Must Fill Fields"));
  }
  try {
    const user = await ADMIN.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User Not Found"));
    }
    const passwordchecking = bcrypt.compareSync(password, user.password);
    if (!passwordchecking) {
      return next(errorHandler(404, "Password Not Correct"));
    }
    const isVerifiedcheck = user.isVerified;
    if (!isVerifiedcheck) {
      return next(errorHandler(404, "You Need to Verify Your Account"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ result: "success" });
  } catch (error) {
    next(error);
  }
};
const resetpasswordmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(errorHandler(404, "User Must Fill Email"));
  }
  const user = await ADMIN.findOne({ email });
  if (!user) {
    return next(errorHandler(404, "User Not Found"));
  }

  const resetpasswordlink = `http://localhost:5173/reset-password/${user._id}/${user.randomString}`;
  const mailOptions = {
    from: "vijay.r20799@gmail.com",
    to: email,
    subject: "Reset Password Link",
    text: `Click the following link to verify your account: ${resetpasswordlink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: error.toString() });
    }

    console.log("Email sent:", info.response);
    res.status(200).json({ result: "resetpassword email sent" });
  });
};
const resetpassword = async (req, res, next) => {
  const { id, token } = req.params;
  try {
    const user = await ADMIN.findById({ _id: id });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    console.log(user);
    const hashpassword = bcrypt.hashSync(req.body.password1, 10);
    if (user.randomString != token) {
      return next(errorHandler(404, "Your UnAuthorized"));
    }
    console.log(hashpassword);
    user.password = hashpassword;
    user.randomString = "";
    await user.save();
    res.status(200).json({ result: "Password Resetted " });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signupfunction,
  verifyfunction,
  loginfunction,
  resetpasswordmail,
  resetpassword,
};
