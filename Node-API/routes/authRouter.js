const express = require("express");
const {userSignUpValidator} = require("../validator");
const {signUp, signIn, signOut} = require("../controllers/authController");

// Get router
const router = express.Router();

router.post("/signup", userSignUpValidator, signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

// Export router
module.exports = router;

