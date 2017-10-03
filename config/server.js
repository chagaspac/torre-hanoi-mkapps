var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var expressValidator = require('express-validator');
var path = require('path');
var logger = require('morgan');
var fs = require('fs');
var http = require('http');
var https = require('https');
var subdomain = require('express-subdomain');
var basicAuth = require('express-basic-auth');
var morgan = require('morgan');
var accessLogStream = fs.createWriteStream(path.join(__dirname, '../log/hanoi.log'), { flags: 'a', encoding:'UTF-8' });
var app = express();

app.use(logger('dev', { stream: accessLogStream }));

//app.use(logger({ path: "/log/hanoi.log" }));

app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));
app.use(bodyParser.json({ limit: '500mb' }));

app.use(expressValidator());

app.use(expressSession({
	secret: 'mys3cr3tk3y$$#1135',
	resave: false,
	saveUninitialized: false
}));

app.use(function (req, res, next) {
	res.locals.session = req.session;
	next();
});
consign()
	.include('app/route')
	.then('config/dbConnection.js')
	.then('app/model')
	.then('app/controller')
	.then('app/util')
	.into(app);
var router = express.Router();

app.use(subdomain('api', router));

module.exports = app;












