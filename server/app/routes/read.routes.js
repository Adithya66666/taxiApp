const controller = require("../controllers/read.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/read/getuser",controller.getuser);
  app.post("/api/read/getdrivers",controller.getdrivers);
  app.post("/api/read/findDriver",controller.findDriver);
  app.post("/api/read/gettrip",controller.gettrip);
  app.post("/api/read/getdriver",controller.getdriver);
  app.post("/api/read/getTrips",controller.getTrips);
  app.post("/api/read/getTodayTrips",controller.getTodayTrips);
  app.post("/api/read/getTodayDriverTrip",controller.getTodayDriverTrip);
  app.post("/api/read/getTripsadmin",controller.getTripsadmin);
  app.post("/api/read/getTripsdriver",controller.getTripsdriver);
};
