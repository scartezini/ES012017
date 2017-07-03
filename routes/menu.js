var express = require('express')
var router = express.Router()

let mongoose = require('mongoose')
let Menu = require('../models/menu')



//GET
router.get('/', (req,res,next) => {
	Menu.find({},(err,menus) =>{
		if(err){
			res.status(400)
			res.json(err)
		}else
			res.json(menus)
	})
})


//POST
router.post('/',(req,res,next) => {
	new Menu(req.body).save((err,menu) => {
		if(err){
			res.status(400)
			res.json(err)
		}else{
			res.json(menu)
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
