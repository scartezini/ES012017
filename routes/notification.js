var express = require('express')
var router = express.Router()
var functions = require('./functions')
let mongoose = require('mongoose')
let Notification = require('../models/notification')
let Table = require('../models/table')
let Restaurant = require('../models/restaurant')

//GET
router.get('/', functions.requireRestaurant, functions.requireLoggedRestaurant, (req,res,next) => {
    Restaurant.findOne({_id: req.restaurant._id}).populate({
        path: 'tables',
        populate: {path: 'notifications',
                    model: 'Notification'}
    })
    .exec(function(err, result) {
        if (err) {
            res.status(400)
            res.json(err)
        }
        else {
            res.json(result.tables)
        }
    })
})

//POST
router.post('/', functions.requireTable, functions.requireLoggedTable, (req,res,next) => {
    var notification = new Notification({type: req.body.type, message: req.body.message})
    
    notification.save((err, notification) => {
        if(err) {
            res.status(400)
            res.json(err)
        }
        else {
            req.table.notifications.push(notification)
            req.table.save((err, table) => {
                if(err) {
                    res.status(400)
                    res.json(err)
                }
                else {
                    res.json(notification)
                }
            })
        }
    })
})

//DELETE 
router.delete('/:id', functions.requireRestaurant, functions.requireLoggedRestaurant, (req,res,next) => {
    Notification.remove({_id : req.params.id},(err) =>{
            if(err){
                res.status(400)
                res.json(err)
            }
                    else
                res.json({remove:"ok"});

    })
})


module.exports = router;
