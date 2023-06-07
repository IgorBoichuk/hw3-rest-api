const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');


const contactsControllers = require('../../controllers/contacts-controllers');

router.get('/', auth, contactsControllers.getAllContactsCtrl);

router.get('/:contactId', contactsControllers.getContactByIdCtrl);

router.post('/', auth, contactsControllers.addContactCtrl);

router.delete('/:contactId', contactsControllers.deleteContactCtrl);

router.put('/:contactId', contactsControllers.updateByIdCtrl);

router.patch('/:contactId/favorite', contactsControllers.updateFavoriteFieldCtrl);

module.exports = router;
