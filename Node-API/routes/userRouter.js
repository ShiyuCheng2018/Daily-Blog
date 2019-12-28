const express = require("express");
const {userById, allUsers} = require("../controllers/userController");

// Get router
const router = express.Router();

router.get("/users", allUsers);

// Any route containing :userId, our app will first execute userById()
router.param("userId", userById);

// Export router
module.exports = router;

