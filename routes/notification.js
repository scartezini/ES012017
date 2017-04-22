var express = require('express')
var router = express.Router()

let mongoose = require('mongoose')
let Notification = require('../models/notification')


//GET
router.get('/', (req,res,next) => {
	Notification.find({},(err,notifications) =>{
		if(err){
			res.status(400)
			res.json(err)
		}else
			res.json(notifications)
	})
})


//POST
router.post('/',(req,res,next) => {
	new Notification(req.body).save((err,notification) => {
		if(err){
			res.status(400)
			res.json(err)
		}
		else{
			res.json(notification)
		}
	})
})
module.exports = router;
