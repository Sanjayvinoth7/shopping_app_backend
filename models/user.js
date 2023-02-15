const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
  },
  isAdmin:{
    type: Boolean,
    default: false
  }
});


var User = mongoose.model('User', UserSchema)
module.exports =  { User }