const config = require("../config/auth.config");
const db = require("../models");
const express = require("express");

const userRouter = express.Router();
let user = require("../models/user.model");
let driver = require("../models/driver.model");
let trip = require("../models/trip.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.getuser = (req, res) => {
   var id = req.body.id;
   //return res.json({success:true,message:`${username}`});
      user.findById(id, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      }) 
 };


exports.getdrivers = async (req,res) => {
  const results = await driver.find({
    usertype:"driver",
  });
  res.json(results);
}

exports.findDriver = async (req,res) => {
  var taxiType = req.body.taxiType;
  var date = req.body.date;
  var selectedDrivers = [];

  //getting the drivers that are on the same type
  const results = await driver.find({
    vehicleType:taxiType,
  });

  let trip_results;
  counter = 0;
  while(results.length > counter){
    trip_results = await trip.find({
      driverid:results[counter]._id,
      date:date,
    });
    if(JSON.stringify(trip_results) == "[]"){
      selectedDrivers.push(results[counter]._id);
    }
    counter++;
  }
  if(selectedDrivers.length != 0){
    const randomIndex = Math.floor(Math.random() * selectedDrivers.length);
    res.json(selectedDrivers[randomIndex]);
  }else{
    res.json('nodrivers');
  }
}

exports.gettrip = async (req,res) => {
  const results = await trip.find({
    tripid:req.body.tripid,
  });
  res.json(results);
}

exports.getdriver = async (req,res) => {
  const results = await driver.find({
    _id:req.body.id,
  });
  res.json(results);
}

exports.getTrips = async (req,res) => {
  var userid = req.body.id;
  const trips = await trip.find({
    userid : userid,
  });
  res.json(trips);
}


exports.getTodayTrips = async (req,res) => {
  var userid = req.body.id;
  var date = req.body.date;
  const trips = await trip.find({
    userid : userid,
    date: date,
  });
  res.json(trips);
}

exports.getTodayDriverTrip = async (req,res) => {
  var userid = req.body.id;
  var date = req.body.date;
  const trips = await trip.find({
    driverid : userid,
    date: date,
  });
  res.json(trips);
}
exports.getTripsadmin = async (req,res) => {
  const trips = await trip.find({

  });
  res.json(trips);
}


exports.getTripsdriver = async (req,res) => {
  var userid = req.body.id;
  const trips = await trip.find({
    driverid : userid,
  });
  res.json(trips);
}