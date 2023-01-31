const controller = require("../controllers/update.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.post("/api/update/updateTripStatus",controller.updateTripStatus);
  app.post("/api/update/endTripStatus",controller.endTripStatus);
};
