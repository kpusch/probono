var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")
var https=require("https")

// js added
var MySQLStore = require('express-mysql-session')(session);
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path');
var ejs = require('ejs');

require('./config/passport')(passport); // pass passport for configuration
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(session({
	secret: 'rdtcfyuuoivgtft',
	resave: true,
	saveUninitialized: true,

	store: new MySQLStore({
		host:'211.253.24.236',
		port:3306,
		user:'root',
		password:'1q2w3e4r!',
		database:'cedu'
	})
 } ));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


const options = {
	key: fs.readFileSync('./keys/key.pem').toString(),
	cert: fs.readFileSync('./keys/cert.pem').toString()
};

https.createServer(options, app).listen(3000, function() {
  console.log("HTTPS server listening on port " + 3000);
});

//app.get('/', function (req, res) {
//    res.render('index')
//});

app.get('/in', function (req, res) {
	console.log("aa");
    res.render('gm2')
});

app.get('/service', function (req, res) {
	console.log("aa");
    res.render('service')
});
app.get('/service2', function (req, res) {
	console.log("aa");
    res.render('service2')
});

app.use(express.static('public'));

// routes ======================================================================
require('./app/routes.js')(app, passport);
