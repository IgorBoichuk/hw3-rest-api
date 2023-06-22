const Contact = require("../models/contact");
const User = require("../models/user");

const { HttpError } = require("../helpers");
const { controllerDecorator } = require("./controller-decorator");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const listContacts = await Contact.find({ owner }, "-updatedAt", {
    skip,
    limit,
  });
  res.json(listContacts);
};

const getContactsById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw HttpError(404, `Contact with "${id}" ID is not found`);
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  await User.findByIdAndUpdate(owner, { $push: { contacts: newContact._id } });
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

const updateFavorite = async (req, res) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

const deleteContact = async (req, res) => {
  const deletedContact = await Contact.findByIdAndRemove(req.params.id);
  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(deletedContact);
};

module.exports = {
  getContacts: controllerDecorator(getContacts),
  getContactsById: controllerDecorator(getContactsById),
  addContact: controllerDecorator(addContact),
  updateContact: controllerDecorator(updateContact),
  updateFavorite: controllerDecorator(updateFavorite),
  deleteContact: controllerDecorator(deleteContact),
};
