const express = require("express");
const {
  authUser,
  registerUser,
  updateUserProfile,
} = require("../controller/userControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);

module.exports = router;
