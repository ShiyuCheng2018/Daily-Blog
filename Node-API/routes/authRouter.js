const express = require("express");
const {userSignUpValidator} = require("../validator");
const {signUp, signIn, signOut} = require("../controllers/authController");
const {userById} = require("../controllers/userController");

// Get router
const router = express.Router();

router.post("/signup", userSignUpValidator, signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

// Any route containing :userId, our app will first execute userById()
router.param("userId", userById);

// Export router
module.exports = router;

