const express = require("express");
const {userSignUpValidator} = require("../validator");
const {signUp} = require("../controllers/authController");

// Get router
const router = express.Router();

router.post("/signup", userSignUpValidator, signUp);

// Export router
module.exports = router;

