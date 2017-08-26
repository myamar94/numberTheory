var express = require('express');
var port = process.env.PORT||4000;
var server = express();
var path = require('path');

server.use(express.static(path.join(__dirname + "./../client")));


server.get("*", function(req, res){
    
    res.sendFile(path.join(__dirname + "./../client/views/index.html"));
});

server.listen(port, function(){
   
    console.log("Server is running at PORT "+ port);
});