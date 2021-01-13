require('dotenv').config();

const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// mazi me to env file pou petaei error pros to paron

// const host = process.env.TR_HOST;
// const port = process.env.TR_PORT;
// const secure = process.env.TR_SEC;
// const user = process.env.TR_USER;
// const pass = process.env.TR_PASS;

// console.log(host, port, secure, user, pass);


// const transporter = nodemailer.createTransport({
//     host: host,
//     port: port,
//     secure: secure, 
//     auth: {
//       user: user, 
//       pass: pass, 
//     },
//   });

// Xwris to env opws leitourgouse prin


const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, 
    auth: {
      user: "d_darv@hotmail.gr", 
      pass: "ksddgsnt1234", 
    },
  });


  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });


 


//   transporter.sendMail(message, (err, suc)=>{
//       if (err) {
//           console.log(err)
//       } else {
//         console.log("message has been sent")
//       }
    
//   })


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
  // console.log(req.body);
  const {message} = req.body;

  const readyMessage = {
    from: "d_darv@hotmail.gr",
    to: "d_darv@hotmail.gr",
    subject: "Got a contact form from website",
    text: message,
    
  };

  // console.log(readyMessage);

  transporter.sendMail(readyMessage, (err, suc)=>{
      if (err) {
          console.log(err)
      } else {
        console.log("message has been sent")
      }
    
  })

  res.redirect("/works")
})

app.get("/shop" , (req, res)=> {
    res.render("shop")
})

app.listen(3000, ()=> {
    console.log("listening to 3000");
})