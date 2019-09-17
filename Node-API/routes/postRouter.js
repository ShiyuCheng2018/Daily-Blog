const express = require("express");

const {getPosts, createPost} = require("../controllers/postController");

// Get router
const router = express.Router();


router.get("/", getPosts);
router.post("/post", createPost);

// Export router
module.exports = router;

