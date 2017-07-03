var express = require('express');
var passport = require('passport');
var Restaurant = require('../models/restaurant');
var router = express.Router();


router.post('/register', (req, res, next) => {
    new Restaurant({email: req.body.email, password: req.body.password}).save((err, result) => {
        if (err) {
            res.status(302)
            res.json(err)
        } else {
            res.status(200)
            res.json(result._id)
        }
    })
});

router.post('/login', (req, res, next) => {
    Restaurant.findOne({email: req.body.email}, (err, result) => {
        if(!result) {
            res.status(401)
            res.json({error: 'Invalid email or password'})
        } else {
            if(req.body.password === result.password) {
                req.session.restaurant = result
                res.status(200)
                res.json(result._id)
            } else {
                res.status(401)
                res.json({error: 'Invalid email or password'})
            }
        }
    }) 
})

module.exports = router;
