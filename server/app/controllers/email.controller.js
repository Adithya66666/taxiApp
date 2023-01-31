const express = require("express");
var nodemailer = require('nodemailer');
const db = require("../models");
const Drv = db.driver;
const Trp = db.trip;

exports.sendEmail = async (req, res) => {
    var email = req.body.email;
    var tripid = req.body.tripid;

    const Trip = await Trp.find({
        tripid : tripid,
    });

    const Driver = await Drv.find({
        _id : Trip[0].driverid,
    });

    console.log(Trip,Driver);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'taxiserviceapplication@gmail.com',
          pass: 'xroodbodcnylearx'
        }
    });
      
      var mailOptions = {
        from: 'taxiserviceapplication@gmail.com',
        to: email,
        subject: `Confirmation of your trip ${tripid}`,
        text: `Hello ${Trip[0].customerName}, your trip is confirmed. \n 
        Trip Id = ${tripid} \n
        Taxi type = ${Trip[0].selectedTypeName} \n
        Pickip location = ${Trip[0].pickup} \n
        Drop locatoin = ${Trip[0].drop} \n
        Date = ${Trip[0].date} \n
        Time = ${Trip[0].time} \n
        Driver Name = ${Driver[0].firstname} ${Driver[0].lastname} \n
        Driver phone number = ${Driver[0].phone} \n
        Vehicle number = ${Driver[0].vehicleNumber} \n
        Vehicle name = ${Driver[0].vehicleName} \n
        Vehicle colour = ${Driver[0].vehicleColour} \n`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}