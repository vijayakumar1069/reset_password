const ADMIN = require("../models/admin.model.js");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const errorHandler = require("../utils/errorHandler.js");

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

module.exports = { signupfunction, verifyfunction };
