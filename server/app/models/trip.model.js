const mongoose = require("mongoose");

const Trip = mongoose.model(
  "Trip",
  new mongoose.Schema({
    userid:String,
    pickup:String,
    drop:String,
    date:String,
    selectedTypeName:String,
    typeOfTheTrip:String,
    time:String,
    customerName:String,
    phone:String,
    email:String,
    driverid:String,
    tripid:String,
    status:String,
  })
);

module.exports = Trip;
