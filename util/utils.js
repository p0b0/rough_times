require('dotenv').config();
const nodemailer = require('nodemailer');

const host = process.env.TR_HOST;
const port = parseInt(process.env.TR_PORT);
const user = process.env.TR_USER;
const pass = process.env.TR_PASS;
let secure = process.env.TR_SEC;
if (secure === "true") {
    secure = true;
} else {
    secure = false;
}

const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: secure,
    auth: {
      user: user,
      pass: pass,
    },
  });

var isMailEnabled;

  transporter.verify(function(error, success) {
    if (error) {
        isMailEnabled = false;
      console.log(error.stack);
    } else {
        isMailEnabled = true;
      console.log("Server is ready to take our messages");
    }
  });


  function sendEmail (readyMessage, cb) {
    transporter.sendMail(readyMessage, (err, suc)=>{
        if (err) {
            console.log(err)
            return cb(err);
        } else {
          console.log("message has been sent")

        }
    })
    return cb(null);
  }

  module.exports = {
      sendEmail: sendEmail,
      isMailEnabled: isMailEnabled,
      user: user
  }
  