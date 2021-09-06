// require('dotenv').config();

const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
// const PDFJS = require('pdfjs-dist');
// const utils = require('./util/utils');


// const host = process.env.TR_HOST;
// const port = process.env.TR_PORT;
// const secure = process.env.TR_SEC;
// const user = process.env.TR_USER;
// const pass = process.env.TR_PASS;


// still without tranfering mailer to utils

// const transporter = nodemailer.createTransport({
//     host: host,
//     port: port,
//     secure: secure,
//     auth: {
//       user: user,
//       pass: pass,
//     },
//   });


  // transporter.verify(function(error, success) {
  //   if (error) {
  //     console.log(error.stack);
  //   } else {
  //     console.log("Server is ready to take our messages");
  //   }
  // });


var comicPath = path.join(__dirname, 'pdfs');

var pdfMap = {
    one: 'multipage.pdf',
    two: 'pdf-test.pdf',
    three: 'third.pdf'
};

app.set('view engine', 'ejs');


app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/" , (req, res)=> {
    res.render('home');
})

app.get("/works", (req, res)=> {
    res.render('works');
})

app.get("/about", (req, res)=> {
    res.render("about")
})


app.get("/contact" , (req, res)=> {
    res.render('contact')
})

app.post("/contact" , (req, res)=> {
  
  // const {message} = req.body;
  //
  // const readyMessage = {
  //   from: user,
  //   to: user,
  //   subject: "Got a contact form from website",
  //   text: message,
  //
  // };
  //
  // utils.sendEmail(readyMessage, (err)=> {
  //   if (err) {
  //     res.send(err)
  //   }
  //   else {
  //     res.redirect("/works")
  //   }
  // })
  //
  // transporter.sendMail(readyMessage, (err, suc)=>{
  //     if (err) {
  //         console.log(err)
  //     } else {
  //       console.log("message has been sent")
  //     }
    
  // })

res.redirect("/works");

})

app.get("/shop" , (req, res)=> {
    res.render("shop")
})

app.get('/comic/:id', (req, res)=> {
    var issueNumber = req.params.id;
    //needs to be checked
    // var fileName = pdfMap.issueNumber;
    fs.readFile(comicPath+'/'+ fileName, function (err,data) {
        res.contentType("application/pdf");
        res.send(data);
    })

})

app.listen(3000, ()=> {
    console.log("listening to 3000");
})