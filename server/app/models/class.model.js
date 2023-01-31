const mongoose = require("mongoose");

const Class = mongoose.model(
  "Class",
  new mongoose.Schema({
    className: String,
    description: String,
    userId:String,
    studentCount:String,
  })
);

module.exports = Class;
