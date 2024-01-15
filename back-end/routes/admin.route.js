const express = require("express");
const {
  signupfunction,
  verifyfunction,
  loginfunction,
  resetpasswordmail,
  resetpassword,
} = require("../controller/admin.controller");
const router = express.Router();

router.post("/signup", signupfunction);
router.get("/verify/:id/:token", verifyfunction);
router.post("/login", loginfunction);
router.post("/forgotpasswordmail", resetpasswordmail);
router.post("/reset-password/:id/:token", resetpassword);

module.exports = router;
