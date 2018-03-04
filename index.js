const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var path = require('path');

var nodemailer = require('nodemailer');
require('dotenv').config()

app.use(bodyParser.urlencoded({extended:false }));
app.use(bodyParser.json());

app.use("/views", express.static(__dirname + '/views'));
app.use("/scripts",express.static(__dirname + '/scripts'));
app.use("/styles", express.static(__dirname + '/styles'));
app.use(express.static(__dirname + '/assets'));

app.get('/', function(req,res) {
  res.sendFile("index.html", {"root": __dirname});
})

app.post("/test", function (req, res) {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: process.env.NODE_EMAIL,
      pass: process.env.NODE_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

    const emailTemplate = `
    <div style="font-family: Arial; text-align: center; padding: 5rem;">
      <img src="https://media.giphy.com/media/xUPGcxpCV81ebKh7Vu/giphy.gif" />
        <h1 style="font-size:3rem; ">Thanks for RSVPing!</h1>
        <h4 style="font-size:1rem;">Check out our wedding website for specifics about the day, travel tips, and registry details:</h4>
        <h2 style="font-size:2rem;">arianaandjoey.com</h2>

        <h3 style="font-size:1rem;">Love,</h3>
        <h3 style="font-size:1rem;">Ariana & Joey</h3>
    </div>
    `;

  let HelperOptions = {
    from: 'arianaandjoey@gmail.com',
    to: req.body.email,
    subject: 'Ariana & Joey Wedding RSVP Confirmation!',
    html: emailTemplate
  };

  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(req.email);
    console.log("The message was sent!");
    console.log(info);
  });

});

app.get('/the-day',function(req,res){
  res.sendFile(path.resolve('./views/the-day.html'));
});

app.get('/travel',function(req,res){
  res.sendFile(path.resolve('./views/travel.html'));
});

app.get('/registry',function(req,res){
  res.sendFile(path.resolve('./views/registry.html'));
});

app.get('/rsvp',function(req,res){
  res.sendFile(path.resolve('./views/rsvp.html'));
});

app.get('/rsvplease',function(req,res){
  res.sendFile(path.resolve('./views/rsvp-please.html'));
});

app.get('/dashboard', function(req, res){
  res.sendFile(path.resolve('./views/dashboard.html'));
});

app.get('/party-time',function(req,res){
  res.sendFile(path.resolve('./views/party-time.html'));
});

app.get('/assets',function(req,res){
  res.sendFile(path.resolve('./assets'));
});

app.listen(process.env.PORT || 3000, () => console.log('listening on port 3000'));
