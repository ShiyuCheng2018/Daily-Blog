const express = require("express");
const {createPostValidator, getErrors} = require("../validator");
const {signUp} = require("../controllers/authController");

// Get router
const router = express.Router();

router.post("/signup", signUp);

// Export router
module.exports = router;

