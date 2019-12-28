const express = require("express");
const {userById, allUsers, getUser, updateUser, deleteUser} = require("../controllers/userController");
const {requireSignIn} = require("../controllers/authController");

// Get router
const router = express.Router();

router.get("/users", allUsers);
router.get("/user/:userId",requireSignIn, getUser);
router.put("/user/:userId", requireSignIn, updateUser);
router.delete("/user/:userId", requireSignIn, deleteUser);


// Any route containing :userId, our app will first execute userById()
router.param("userId", userById);

// Export router
module.exports = router;

