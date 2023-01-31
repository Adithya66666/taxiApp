const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Driver = db.driver;
const Role = db.role;

const curDay = new Date().getUTCDate();
const curMonth = new Date().getMonth();
const curYear = new Date().getFullYear();

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    dob:req.body.dob,
    phone:req.body.phone,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    usertype: "customer",
    numberoftrips:0,
  });
  
  user.save()
      .then((_) => {
      res.json({success:true,message:'Account has been created'});
  }).catch((error) => {
      if(error.code === 11000){
          return res.json({success:false,message:"Email already registered"});
      }
      res.json({success:false,message:"Auth Failed"});
  })
};

exports.signin = (req, res) => {
  console.log('sd');
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        usertype:user.usertype,
      });
    });
};

exports.driverlogin = (req, res) => {
  console.log('drv');
  Driver.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        usertype:user.usertype,
      });
    });
};



exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

exports.driverSignup = (req, res) => {
  const driver = new Driver({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    dob:req.body.dob,
    phone:req.body.phone,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    usertype: "driver",
    numberoftrips:0,
    nic:req.body.nic,
    vehicleType:req.body.vehicletype,
    vehicleNumber:req.body.vehicleNumber,
    vehicleName:req.body.vehicleName,
    vehicleColour:req.body.vehicleColour,
    joinedDate:curYear+"-"+curMonth+"-"+curDay, 
  });
  
  driver.save()
      .then((_) => {
      res.json({success:true,message:'Account has been created'});
  }).catch((error) => {
      if(error.code === 11000){
          return res.json({success:false,message:"Email already registered"});
      }
      res.json({success:false,message:"Auth Failed"});
  })
};

