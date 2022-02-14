const Contact = require("../models/contactModel");
const asyncHandler = require("express-async-handler");

// @desc   Get logged in user contacts
// @route  GET /api/contacts
// @access Private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user: req.user._id });
  res.json(contacts);
});

const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: " Contact not found" });
  }
  res.json(contact)
});

const createContact = asyncHandler(async (req, res) => {
  const { namee, emailAddress, department } = req.body;

  if (!namee || !emailAddress || !department) {
    res.status(400);
    throw new Error("Please Fill all the Fields");
  } else {
    const contact = new Contact({
      user: req.user._id,
      namee,
      emailAddress,
      department,
    });
    const createdContact = await contact.save();
    res.status(201).json(createdContact);
  }
});

const UpdateContact = asyncHandler(async (req, res) => {
  const { namee, emailAddress, department } = req.body;

  const contact = await Contact.findById(req.params.id);

  if (contact.user.toString() != req.user._id.toString()) {
    req.status(401);
    throw new Error("You can't perform this action");
  }

  if (contact) {
    contact.namee = namee;
    contact.emailAddress = emailAddress;
    contact.department = department;

    const updatedContact = await contact.save();
    res.json(updatedContact);
  } else {
    res.status(404);
    throw new error("Contact not found");
  }
});

const DeleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (contact.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error("You can't perform this action");
  }

  if (contact) {
    await contact.remove();
    res.json({ message: "Contact Removed" });
  } else {
    res.status(404);
    throw new Error("Contact not found");
  }
});

module.exports = {
  getContacts,
  createContact,
  getContactById,
  UpdateContact,
  DeleteContact,
};
