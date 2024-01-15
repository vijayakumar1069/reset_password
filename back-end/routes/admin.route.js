const express = require('express');
const { signupfunction, verifyfunction } = require('../controller/admin.controller');
const router=express.Router();

router.post("/signup",signupfunction)
router.get("/verify/:id/:token",verifyfunction)


module.exports = router;