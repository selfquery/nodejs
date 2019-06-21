
/* VARIABLES */
const mongoose = require('mongoose');

/* SCHEMA */
const userSchema = new mongoose.Schema({
  googleID: { type:String, required:true }
})

/* MODEL */
mongoose.model('users', userSchema);
