const express = require('express');
const app = express();
var path = require('path');

var nodemailer = require('nodemailer');
require('dotenv').config()

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

  let HelperOptions = {
    from: 'arianaandjoey@gmail.com',
    to: 'arianaandjoey@gmail.com',
    subject: 'You RSVPed to our Wedding!',
    html: '<h1>Wow, you are awesome!</h1><p>The most awesome</p><p>Yes you are!</p>'
  };

  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
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
