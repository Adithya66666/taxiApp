const mongoose = require("mongoose");

const Driver = mongoose.model(
  "Driver",
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
    nic:String,
    vehicleType:String,
    vehicleNumber:String,
    vehicleName:String,
    vehicleColour:String,
    joinedDate:String,
  })
);

module.exports = Driver;
