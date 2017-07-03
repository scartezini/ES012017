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


module.exports = router;
