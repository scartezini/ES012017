var express = require('express');
var passport = require('passport');
var Restaurant = require('../models/restaurant');
var router = express.Router();


router.get('/', function (req, res) {
    res.render({ user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Restaurant.register(new Restaurant({ email : req.body.email }), req.body.password, function(err, restaurant) {
        if (err) {
            return res.render("register", {info: "Sorry. That username already exists. Try again."})
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', passport.authenticate('local',{section:false}), function(req, res){
    console.log(req);
    res.status(200).send("pong!");
});

module.exports = router;