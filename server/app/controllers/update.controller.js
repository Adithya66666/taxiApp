const config = require("../config/auth.config");
const db = require("../models");
const express = require("express");

const userRouter = express.Router();
let user = require("../models/user.model");
let driver = require("../models/driver.model");
let trip = require("../models/trip.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.updateTripStatus = (req, res) => {
    trip.findByIdAndUpdate(
        req.body.tripid,
        {
          status: 'started',
        },
        (error, data) => {
          if (error) {
            return next(error)
          } else {
            res.json(data)
          }
        },
      )
};

exports.endTripStatus = (req, res) => {
  trip.findByIdAndUpdate(
      req.body.tripid,
      {
        status: 'ended',
      },
      (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      },
    )
};