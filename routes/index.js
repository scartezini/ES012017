var express = require('express');
var router = express.Router();
let Table = require('../models/table')
var session = require('client-sessions')

router.get('/', (req,res,next) => {
		res.redirect('/restaurant')
})

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/access');
})

router.get('/table', (req, res, next) => {
    res.render('temp/tables')
})

router.get('/notification', (req, res, next) => {
    res.render('temp/notifications')
})

router.get('/access', (req, res, next) => {
    res.render('temp/access')
})

router.get('/restaurant', (req, res, next) => {
    res.render('temp/restaurant')
})

router.get('/menu', (req, res, next) => {
    if(req.session && req.session.table) {
        Table.findOne({_id: req.session.table }, (err, result) => {
            if(!result) {
                req.session.destroy();
                req.redirect('/access');
            }
            else {
                res.locals.table = result;
                res.render('temp/menu', {table: result});
            }
        })
    }
    else {
        res.redirect('/access')
    }
})

module.exports = router;
