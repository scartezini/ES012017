var express = require('express');
var router = express.Router();


router.route('/tables')
.get(function(req, res, next){
    res.render('temp/tables');
})

router.route('/notifications')
.get(function(req, res, next){
    res.render('temp/notifications');
})

router.route('/access')
.get(function(req, res, next){
    res.render('temp/access');
})

router.route('/menu')
.get(function(req, res, next){
    res.render('temp/menu');
})

module.exports = router;
