const express = require("express");
const {
  getContacts,
  createContact,
  getContactById,
  DeleteContact,
  UpdateContact,
  
} = require("../controller/contactController");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getContacts);
router
  .route("/:id")
  .get(getContactById)
  .put(protect, UpdateContact)
  .delete(protect, DeleteContact);
router.route("/create").post(protect, createContact);

module.exports = router;
