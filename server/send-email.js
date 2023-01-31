var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'taxiserviceapplication@gmail.com',
    pass: 'xroodbodcnylearx'
  }
});

var mailOptions = {
  from: 'taxiserviceapplication@gmail.com',
  to: 'adithyabandara01@gmail.com',
  subject: 'Confirmation of your trip',
  text: `Hey! your trip is Confirmed. trip details.....`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});