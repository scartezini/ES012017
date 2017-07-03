var randomstring = require("randomstring")
var express = require('express')
var router = express.Router()
var functions = require('./functions')
let mongoose = require('mongoose')
let Table = require('../models/table')
let Restaurant = require('../models/restaurant')
//GET
router.get('/', functions.requireRestaurant, functions.requireLoggedRestaurant, (req,res,next) => {
    Restaurant.findOne({_id: req.restaurant._id}).populate('tables').exec(function(err, result) {
        if(err) {
            res.status(400)
            res.json(err)
        } else {
            res.status(200)
            res.json(result.tables)
        }
    })
})

router.get('/:id',(req,res,next) => {
	Table.findOne({_id: req.params.id}, (err,result) => {
		if(err){
			res.status(400)
			res.json(err)
		}else
			res.json(result)
	})
})

//POST
router.post('/', functions.requireRestaurant, functions.requireLoggedRestaurant, (req,res,next) => {
    var table = new Table({name: req.body.name})
    table.token = randomstring.generate(4)
    
    table.save((err,table) => {
		if(err){
			res.status(400)
			res.json(err)
		}
		else{
            req.restaurant.tables.push(table)
            req.restaurant.save((err, restaurant) => {
                if(err) {
                    res.status(400)
                    res.json(err)
                }
                else {
			        res.json(table)
                }
            })
		}
	})
})

	
//DELETE
router.delete('/:id', functions.requireRestaurant, functions.requireLoggedRestaurant, (req,res,next) => {
    Restaurant.findOneAndUpdate({_id: req.restaurant._id},
    {
        $pull: {tables: req.params.id}
    },  function(err, result) {
        if (err) {
            res.status(400)
            res.json(err)
        }
        else {
            res.status(200)
            res.json({result: "Done"})
        }
    })
})


module.exports = router;
