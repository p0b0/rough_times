require('dotenv').config();

const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const PDFJS = require('pdfjs-dist');
const utils = require('./util/utils');


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
    //add
    // var isMailEnabled = utils.isMailEnabled;
    // res.render('contact', {isMailEnabled: isMailEnabled})
    res.render('contact');
})

app.post("/contact" , (req, res)=> {
  
  const {message} = req.body;
  var user = utils.user;

  const readyMessage = {
    from: user,
    to: user,
    subject: "Got a contact form from website",
    text: message,
    
  };

  utils.sendEmail(readyMessage, (err)=> {
    if (err) {
      res.send(err)
    }
    else {
      res.redirect("/works")
    }
  })

})

app.get("/shop" , (req, res)=> {
    res.render("shop")
})

app.listen(3000, ()=> {
    console.log("listening to 3000");
})