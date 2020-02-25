const express = require("express");
const {userById,
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    userPhoto,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower} = require("../controllers/userController");
const {requireSignIn} = require("../controllers/authController");

// Get router
const router = express.Router();

router.put('/user/follow', requireSignIn, addFollowing, addFollower);
router.put('/user/unfollow', requireSignIn, removeFollowing, removeFollower);

router.get("/users", allUsers);
router.get("/user/:userId",requireSignIn, getUser);
router.put("/user/:userId", requireSignIn, updateUser);
router.delete("/user/:userId", requireSignIn, deleteUser);
// Photo
router.get("/user/photo/:userId", userPhoto);


// Any route containing :userId, our app will first execute userById()
router.param("userId", userById);

// Export router
module.exports = router;


