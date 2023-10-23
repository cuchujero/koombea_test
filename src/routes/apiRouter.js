
const express = require('express');
const router = express.Router();
const usersRouter = require('./usersRouter'); 
const linksRouter = require('./linksRouter'); 
//const linksScrappersRouter = require('./linksScrappersRouter'); 

router.use('/users', usersRouter); 
router.use('/links', linksRouter); 
//router.use('/linksScrappers', linksScrappersRouter);

module.exports = router;
