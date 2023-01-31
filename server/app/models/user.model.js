const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstname: String,
    lastname: String,
    dob:String,
    phone:String,
    username: String,
    email: String,
    password: String,
    usertype: String,
    numberoftrips:Number,
  })
);

module.exports = User;
