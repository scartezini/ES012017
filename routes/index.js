var express = require('express');
var router = express.Router();


router.get('/', (req,res,next) => {
		res.redirect('/table')
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

router.get('/menu', (req, res, next) => {
    res.render('temp/menu');
})

module.exports = router;
