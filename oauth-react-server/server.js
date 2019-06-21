/* LOAD ENV VARIABLES */
require('dotenv').config();

/* VARIABLES */
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieSession = require('cookie-session')
const passport = require('passport');

/* ENABLE COOKIE */
app.use(
  cookieSession({
    maxAge:30*24*60*60*1000,
    keys: [process.env.COOKIE_SECRET]
  })
);
app.use(passport.initialize());
app.use(passport.session());

/* MODELS */
require('./models/user');

/* DATABASE CONNECTION */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('{!} connection to database successfully.');
}).catch(err => {
  console.log("{!} couldn't connect to database. exiting...");
  process.exit();
});

/* SERVICES */
require('./services/passport')(app);






const PORT = process.env.PORT || 5000;
app.listen(PORT);
