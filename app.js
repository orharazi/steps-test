var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');
var postsnumberRouter = require('./routes/postsnumber');
var statisticsRouter = require('./routes/statistics');

var app = express();

mongoose.connect("mongodb+srv://stepsAdmin:stepsAdmin123@testscluster.bwses.mongodb.net/stepsDB?retryWrites=true&w=majority")
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log(err) )
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/favicon.ico', (req, res) => res.status(200).end());

app.use('/', indexRouter);
app.use('/posts', postsRouter)
app.use('/postsnumber', postsnumberRouter)
app.use('/statistics', statisticsRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: "error"});
});

module.exports = app;
