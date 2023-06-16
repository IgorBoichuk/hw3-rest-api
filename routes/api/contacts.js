const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const contactsControllers = require("../../controllers/contacts-controllers");

router.get("/", auth, contactsControllers.getAllContactsCtrl);
router.get("/:contactId", auth, contactsControllers.getContactByIdCtrl);
router.post("/", auth, contactsControllers.addContactCtrl);
router.delete("/:contactId", auth, contactsControllers.deleteContactCtrl);
router.put("/:contactId", auth, contactsControllers.updateByIdCtrl);
router.patch(
  "/:contactId/favorite",
  auth,
  contactsControllers.updateFavoriteFieldCtrl
);

module.exports = router;
