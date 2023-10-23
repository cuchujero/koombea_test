// ************ Requires ************
const express = require('express');
const methodOverride =  require('method-override'); 
const path = require('path');
const app = express();
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

// ************ Middlewares ************
app.use(cors());
app.use(session( {resave: true, saveUninitialized: true, secret: process.env.SESSION_SECRET_KEY} ));
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')); 

// ************ Route System ************
const apiRouter = require('./routes/apiRouter'); 
const mainRouter = require('./routes/mainRouter'); 

app.use('/api/v1', apiRouter);
app.use('/', mainRouter);

// ************ Server ************
app.listen(process.env.PORT || 3000, function() {
  console.log("Server running in port 3000");
})

