
const express = require('express');
const router = express.Router();
const path = require('path');

router.use('/register', (req, res) => { res.sendFile(path.resolve(__dirname, '../../views/register.html')); });
router.use('/detail/:id', (req, res) => { req.session.userId? res.sendFile(path.resolve(__dirname, '../../views/detail.html')) : res.send("Not authorized")  });
router.use('/home', (req, res) => { req.session.userId? res.sendFile(path.resolve(__dirname, '../../views/home.html')) : res.send("Not authorized")  });
router.use('/', (req, res) => { res.sendFile(path.resolve(__dirname, '../../views/login.html')); });

module.exports = router;
