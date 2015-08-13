var express = require('express');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');



var app = express();

app.get('/', function(request, response) {
  response.render('index.ejs', {layout: false, 
    title: "test title"},
    function(err, html){
      response.send(html);
    });

})


app.listen(3000);
console.log("Server is listening")