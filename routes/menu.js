var express = require('express')
var router = express.Router()
var functions = require('./functions')
let mongoose = require('mongoose')
let Menu = require('../models/menu')
let Product = require('../models/product')
let Section = require('../models/section')

//GET
router.get('/', functions.requireRestaurant, functions.requireLoggedRestaurant, (req,res,next) => {
	var menuID = req.restaurant.menu
	console.log(menuID)
	Menu.findOne({_id: menuID}).populate({
		path:'sections',
		populate: {path: 'products',
				model: 'Product'}
	})
	.exec(function(err,result) {
		if(err){
			res.status(400)
			res.json(err)
		}else
			res.json(result)
	})
})


//POST
router.post('/', functions.requireRestaurant, functions.requireLoggedRestaurant, (req,res,next) => {
	var menu = new Menu(req.body)
	menu.save((err, resultMenu) => {
		if(err) {
			res.status(400)
			res.json(err)
		}
		else {
			req.restaurant.menu = resultMenu
			req.restaurant.save((err, restaurant) => {
				if(err) {
					res.status(400)
					res.json(err)
				}
				else {
					res.json(resultMenu)
				}	
			})			
		}
	})
})


//PUT
router.put('/:id',(req,res,next) => {
	Menu.findOneAndUpdate({ _id: req.params.id }, req.body,
		{ new: true }, (err, result) => {
		if(err){
			res.status(400)
			res.json(err)
		}else{
			res.json(result)
		}
	})	
})

module.exports = router;
