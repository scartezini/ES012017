var randomstring = require("randomstring")
var express = require('express')
var router = express.Router()
var session = require('client-sessions') 
let mongoose = require('mongoose')
let Table = require('../models/table')

// POST
router.post('/', (req,res,next) => {
	Table.findOne({token: req.body.token.toUpperCase()},(err,result) =>{
		if(!result){
			res.status(401)
			res.json({error: "Invalid table token"})
		}else{
    	req.session.table = result._id;
			res.json(result._id);
		}
	})
})

module.exports = router;
