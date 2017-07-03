var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var passport = require('passport');
var session = require('client-sessions');
var LocalStrategy = require('passport-local').Strategy;


//Routes
var index = require('./routes/index');
var access = require('./routes/access');
var menu = require('./routes/menu');
var table = require('./routes/table');
var notification = require('./routes/notification');
var restaurant = require('./routes/restaurant');

var app = express();

mongoose.connect(process.env.MONGODB_URI);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/access', access);
app.use('/api/table',table);
app.use('/api/menu',menu);
app.use('/api/notification',notification);
app.use('/restaurant', restaurant);

// passport config
var Restaurant = require('./models/restaurant');
passport.use(new LocalStrategy(Restaurant.authenticate()));
passport.serializeUser(Restaurant.serializeUser());
passport.deserializeUser(Restaurant.deserializeUser());

// session handler middleware
app.use(session({
    cookieName: 'tableToken',
    secret: 'vPYlfydlMP',
    duration: 300*60*1000,
    activeDuration: 20*60*1000,
}));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use( (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app; // for testing




















