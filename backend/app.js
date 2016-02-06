var express = require('express');
var passport = require('passport');
var path = require('path');
var routes = require('./routes');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('express-session')({
  secret: process.env.secret || 'secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(routes.passport.serializeUser);
passport.deserializeUser(routes.passport.deserializeUser);
passport.use(routes.passport.strategy);

app.use(express.static(path.join(__dirname, '../build')));

app.post('/api/auth/login', routes.auth.login);
app.get('/api/auth/logout', routes.auth.logout);
app.get('/api/people', routes.people.index);
app.get('*', routes.home.index);

app.use(routes.errors.debug);

module.exports = app;
