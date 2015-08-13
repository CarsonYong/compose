var express = require('express');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');



var app = express();

app.get('/', function(request, response) {
  response.send("Hello World!")
})


app.listen(3000);
console.log("Server is listening")