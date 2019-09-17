const express = require("express");
const postController = require("../controllers/postController");

// Get router
const router = express.Router();

router.get("/", postController.getPosts);

// Export router
module.exports = router;

