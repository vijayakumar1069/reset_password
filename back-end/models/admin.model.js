const mongoose = require("mongoose");

const adminschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      required: true,
      type: String,
    },
    randomString: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const ADMIN = mongoose.model("ADMIN", adminschema);
module.exports = ADMIN;
