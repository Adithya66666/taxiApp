const express = require("express");
const db = require("../models");
const Cls = db.class;
const Enr = db.enrol;
const Trp = db.trip;


exports.bookTaxi = (req, res) => {

    const Trip = new Trp({
        userid:req.body.userid,
        pickup:req.body.pickup,
        drop:req.body.drop,
        date:req.body.date,
        selectedTypeName:req.body.selectedTypeName,
        typeOfTheTrip:req.body.typeofTheTrip,
        time:req.body.time,
        customerName:req.body.customerName,
        phone:req.body.phone,
        email:req.body.email,
        driverid:req.body.driverid,
        tripid:req.body.tripid,
        status:'pending',
    });
    
    Trip.save()
        .then((_) => {
        res.json({success:true,message:'Class has been created'});
    }).catch((error) => {
        res.json({success:false,message:"Class creating falied"});
    })   
}
