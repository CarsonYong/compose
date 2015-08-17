var express = require('express');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var ejs = require('ejs');
var app = express();
var expressLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser');
var keywordExtractor = require('keyword-extractor');


app.set('view engine', 'ejs');
app.set('layout', 'layout');
// app.set('layout', { layout:'layout.ejs'});

app.use(expressLayouts)
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response) {
  response.render('index.ejs', {layout: 'layout'},
    function(err, html){
      response.send(html);
    });
});

app.post('/stopwords', function(request, response) {
  
  response.json({lyrics: keywordExtractor.extract(request.body.lyrics)})

})

app.get('/signup', function(request, response) {
  response.render('signup.ejs', {layout: 'layout'},
    function(err, html){
      response.send(html);
    });
})

app.get('/player', function(request, response) {
  response.render('player.ejs', {layout: 'layout'},
    function(err, html){
      response.send(html);
    });
})

app.listen(3000);
console.log("Server is listening")
