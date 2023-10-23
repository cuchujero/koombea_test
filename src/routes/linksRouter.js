const express = require('express');
const router = express.Router();

const linksController = require('../controllers/linksController');
const {linkFieldsValidator} = require('../helpers/validationsFields');
const {generalValidation} = require('../middlewares/validationsMw');


router.get('/:id?', linksController.getLinks);
router.post('/', linkFieldsValidator, generalValidation, linksController.createLink);
router.put('/', linksController.updateLink);
router.delete('/', linksController.deleteLink);

module.exports = router;