const express = require('express');
const app = express();
var path = require('path');

app.use("/views", express.static(__dirname + '/views'));
app.use("/scripts",express.static(__dirname + '/scripts'));
app.use("/styles", express.static(__dirname + '/styles'));

app.get('/', function(req,res) {
  res.sendFile("index.html", {"root": __dirname});
})

app.get('/details',function(req,res){
  res.sendFile(path.resolve('./views/details.html'));
});

app.get('/registry',function(req,res){
  res.sendFile(path.resolve('./views/registry.html'));
});

app.get('/sights',function(req,res){
  res.sendFile(path.resolve('./views/sights.html'));
});



app.listen(3000, () => console.log('listening on port 3000'));
