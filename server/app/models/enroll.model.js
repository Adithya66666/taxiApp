const mongoose = require("mongoose");

const Enrolment = mongoose.model(
  "Enrolment",
  new mongoose.Schema({
    ClassId: String,
    username: String,
    studentId:String,
  })
);

module.exports = Enrolment;
