var express = require('express')
var router = express.Router()

let mongoose = require('mongoose')
let Notification = require('../models/notification')
let Table = require('../models/table')

//GET
router.get('/', (req,res,next) => {
	Notification.find({}).populate('table').exec(function(err,notifications) {
		if(err){
			res.status(400)
			res.json(err)
		}else
			res.json(notifications)
	})
})


//POST
router.post('/',(req,res,next) => {
    if(req.session && req.session.table) {
        Table.findOne({_id: req.session.table}, (err, result) => {
            if (!result) {
                req.session.destroy();
                req.status(302);
                req.json({error: 'Invalid table token'});
            } 
            else {
              new Notification({type: req.body.type, message: req.body.message, table: result}).save((err,notification) => {
    		        if(err){
    			        res.status(302)
    			        res.json(err)
    		        }
    		        else{
    			        res.json(notification)
    	        	}
	            })
            }
        })
    }
    else {
        res.status(302)
        res.json({error: 'Invalid table token'})
    }
})

//DELETE 
router.delete('/:id',(req,res,next) => {
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
