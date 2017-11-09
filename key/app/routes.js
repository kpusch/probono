// app/routes.js
var email = require('emailjs');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs', {
			user : req.user
		});
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('index.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

// ------------------------------------------working on it-----------------------------------------------
	app.get('/edit', isLoggedIn, function(req, res) {
		res.render('edit.ejs', {
			user : req.user
		});
	});

	app.post('/edit', function(req, res){
		var body = req.body;

		connection.query('UPDATE users SET role=? WHERE id=?', [body.role, body.id],
			function(error, result){
				if(error){
					console.log('update error : ', error.message);
				}else{
					res.redirect('/');
				}
		});
	});

	app.get('/delete', isLoggedIn, function(req, res){
		res.render('delete.ejs', {
			user : req.user
		});
	});

	app.post('/delete', function(req, res){
		var body = req.body;

		req.logout();
		connection.query('DELETE FROM users WHERE id = ?', [body.userid],
			function(error, result){
				if(error){
					console.log('delete error : ', error.message);
				}else{
					res.redirect('/');
				}
		});
	});

	app.get('/service', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('service.ejs', { message: req.flash('signupMessage') });
	});


	// email
	app.post('/sendmail', function(req, res){
		var body = req.body;
		var role = body.role;
		var myMail = "supa0129@daum.net";
		var myMailPW = "1q2w3e4r!";
		var myMailHost = "smtp.daum.net";
		var myMailPort = "465";

		var mailName = body.mailName;
		var mailAddress = body.mailAddress;
		var mailPhone = body.mailPhone;
		var mailContent = body.mailContent;

		var emailServer = email.server.connect({
		user: myMail,
			password: myMailPW,
			host: myMailHost,
			port: myMailPort,
			ssl: true
	});

	var message = {
			text: mailContent,
			from: myMail,
			to: "<supa0129@daum.net>",
			subject: "[From CEDU]" + mailAddress + " " + mailName
	};

		emailServer.send(message, function(err,message){
			console.log(err || message);

			if(err) {

			}else {
				res.redirect('/');
			}

		});
	});
// --

// ----------------------------------------------------------------------------------------------

// logout
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
