const {body} = require('express-validator'); 

const userFieldsValidator = [
  body('userName', 'Field can not be empthy').not().isEmpty(),
  body('userName', 'Field incorrect').isLength({min: 3},{max: 26}),
  body('password', 'Field can not be empthy').not().isEmpty(),
  body('password', 'Field incorrect').isLength({min: 3},{max: 26})
]

const linkFieldsValidator = [
  body('url', 'Field can not be empthy').not().isEmpty(),
  body('url', 'Field incorrect').isLength({min: 3},{max: 26}),
]

const IdValidator = [
  body('id', 'id can not be empthy').not().isEmpty(),
  body('id', 'Field incorrect').isInt()
]

module.exports = {userFieldsValidator, linkFieldsValidator, IdValidator};
