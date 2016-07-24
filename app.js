var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var cors = require('cors')
var passport = require('passport')
var mongoose = require('mongoose')
var session = require('express-session')
var LocalStrategy = require('passport-local')
// var Strategy = require('passport-http').BasicStrategy
var BearerStrategy = require('passport-http-bearer')

var api = require('./api/index')
var User = require('./models/user.js')

// mongo server
var connStr = 'mongodb://10.0.0.58/jipas'
mongoose.connect(connStr, function (err) {
  if (err) throw err
  console.log('Successfully connected to MongoDB at ' + connStr)
})

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(session({
  secret: 'this is my secret',
  resave: false,
  saveUninitialized: false
}))

app.use(express.static(path.join(__dirname, 'public')))

// var corsOptions = {
//   origin: 'https://swaggerhub.com',
//   allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
// }

app.use(cors())

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', api)

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.use(new BearerStrategy(
  function (token, done) {
    User.findOne({token: token}, function (err, user) {
      if (err) { return done(err) }
      if (!user) { return done(null, false) }
      return done(null, user, {scope: 'all'})
    })
  }
))

// passport.use(new Strategy(
//   function (userid, password, done) {
//     User.findOne({ username: userid }, function (err, user) {
//       if (err) { return done(err) }
//       if (!user) { return done(null, false) }
//       if (!user.verifyPassword(password)) { return done(null, false) }
//       return done(null, user, {scope: 'all'})
//     })
//   }
// ))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
