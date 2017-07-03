var randomstring = require("randomstring")
var express = require('express')
var router = express.Router()
var session = require('client-sessions') 
let mongoose = require('mongoose')
let Restaurant = require('../models/restaurant')
let Table = require('../models/table')
module.exports = {
    requireTable: function (req, res, next) {
        if(req.session && req.session.table) {
            Table.findOne({_id: req.session.table}, (err, result) => {
                if(result) {
                    req.table = result;
                    req.session.table = result;
                    res.locals.table = result;
                }
                else {
                    console.log(req.session.table)
                    req.session.destroy();
                }
                next();
            })
        }
        else {
            next();
        }
    },
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
    requireLoggedTable: function (req, res, next) {
        if(!req.table) {
            res.status(401)
            res.json({error: "Invalid credentials for table"})
        } else {
            next();
        }
    },
    requireLoggedRestaurant: function (req, res, next) {
        if(!req.restaurant) {
            res.status(401)
            res.json({error: "Invalid credentials for restaurant"})
        } else {
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
