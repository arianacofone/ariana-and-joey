const express = require('express');
const app = express();
var path = require('path');

app.use("/views", express.static(__dirname + '/views'));
app.use("/scripts",express.static(__dirname + '/scripts'));
app.use("/styles", express.static(__dirname + '/styles'));
app.use("/assets", express.static(__dirname + '/assets'));

app.get('/', function(req,res) {
  res.sendFile("index.html", {"root": __dirname});
})

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

app.get('/party-time',function(req,res){
  res.sendFile(path.resolve('./views/party-time.html'));
});

app.get('/assets',function(req,res){
  res.sendFile(path.resolve('./assets'));
});

app.listen(process.env.PORT || 3000, () => console.log('listening on port 3000'));
