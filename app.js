var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var index = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(session({
 secret:"formSubmit",
 resave: "true",
 saveUninitialized: "true"
}));
app.use(flash());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/public', express.static('./public'));

app.get('/', function(req, res, next) {
  res.render('forms', {
    missingRequiredFields: req.flash("missingRequiredFields"),
    invalidemail: req.flash("invalidemail"),
    firstname: req.session.firstname,
    lastname: req.session.lastname,
    email: req.session.email,
    comments: req.session.comments
  });
});

app.get('/thankyou', function(req, res, next) {
  console.log('request session:' + req.session.firstname);
  res.render('thankyou', {
    firstname: req.session.firstname,
  });
});

app.use('/formsubmission', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
