const express = require("express");

const router = express.Router();

const { isValidId } = require("../../middleware");
const { validateBody } = require("../../middleware");
const { authenticate } = require("../../middleware");
const schemas = require("../../schemas/contactsSchemas");

const contactsControlles = require("../../controllers/contacts-controllers");

router.use(authenticate);

router.get("/", contactsControlles.getContacts);

router.get("/:id", isValidId, contactsControlles.getContactsById);

router.post(
  "/",

  validateBody(schemas.addSchema),
  contactsControlles.addContact
);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  contactsControlles.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  contactsControlles.updateFavorite
);

router.delete("/:id", isValidId, contactsControlles.deleteContact);

module.exports = router;
