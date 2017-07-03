var randomstring = require("randomstring")
var express = require('express')
var router = express.Router()
var session = require('client-sessions') 
let mongoose = require('mongoose')
let Restaurant = require('../models/restaurant')

module.exports = {
    requireRestaurant: function (req, res, next) {
         if(req.session && req.session.restaurant) {
             Restaurant.findOne({_id: req.session.restaurant}, (err, result) => {
                if(result) {
                    req.restaurant = result;
                    delete req.restaurant.password;
                    req.session.restaurant = result;
                    res.locals.restaurant = result;
                }
                else {
                    req.session.destroy();
                }
                next();
            })
        }
        else {
            next();
        }
    },
    redirectLoginRestaurant: function (req, res, next) {
        if (!req.restaurant) {
            res.redirect('/restaurant')
        } else {
            next(); 
        }
    }
}
