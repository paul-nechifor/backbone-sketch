var Strategy = require('passport-local').Strategy;
var _ = require('lodash');
var db = require('./db');
var express = require('express');
var faker = require('faker');
var passport = require('passport');
var path = require('path');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
    secret: process.env.secret || 'secret',
    resave: false,
    saveUninitialized: false,
}));

passport.use(new Strategy(function (username, password, cb) {
    db.users.findByUsername(username, function (err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        if (user.password != password) { return cb(null, false); }
        return cb(null, user);
    });
}));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../build')));

app.post('/api/auth/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
       if (err || !user) {
           return res.json({err: {msg: 'Auth error.'}});
       }
       res.json({res: {user: _.omit(user, 'password')}});
   })(req, res, next);
});

app.get('/api/auth/logout', function (req, res) {
    req.logout();
    res.json({});
});

app.get('/api/people', function (req, res) {
    var perPage = 20;
    var list = _.map(_.range(perPage), function (i) {
        faker.seed(perPage * req.query.index + i + 1);
        return {
            name: faker.name.findName(),
            email: faker.internet.email(),
            address: faker.address.streetAddress(),
            bio: faker.lorem.sentence(),
            image: faker.image.avatar(),
        };
    });
    res.json({res: {list: list, totalPages: 10}});
});

app.use('*', function (req, res) {
    res.render('index');
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

module.exports = app;
