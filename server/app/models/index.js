const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.role = require("./role.model");
db.class = require("./class.model");
db.enrol = require("./enroll.model");

db.user = require("./user.model");
db.driver = require("./driver.model");
db.trip = require("./trip.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;