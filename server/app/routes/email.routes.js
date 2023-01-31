const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/email.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/email/sendEmail", controller.sendEmail);
};
