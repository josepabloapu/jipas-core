var passport = require('passport')
var User = require('../models/user.js')

module.exports.registerGreenUser = function (req, res) {
  var userToBeCreated = {
    username: req.body.username,
    name: req.body.name,
    role: 'green'
  }
  User.register(new User(userToBeCreated),
  req.body.password, function (err, user) {
    if (err) return res.status(500).json({err: err})
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!',
        user: user
      })
    })
  })
}

module.exports.registerYellowUser = function (req, res) {
  var userToBeCreated = {
    username: req.body.username,
    name: req.body.name,
    role: 'yellow'
  }
  User.register(new User(userToBeCreated),
  req.body.password, function (err, user) {
    if (err) return res.status(500).json({err: err})
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!',
        user: user
      })
    })
  })
}

module.exports.registerRedUser = function (req, res) {
  var userToBeCreated = {
    username: req.body.username,
    name: req.body.name,
    role: 'red'
  }
  User.register(new User(userToBeCreated),
  req.body.password, function (err, user) {
    if (err) return res.status(500).json({err: err})
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!',
        user: user
      })
    })
  })
}

module.exports.login = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) return next(err)
    if (!user) return res.status(401).json({err: info})
    req.logIn(user, function (err) {
      if (err) return res.status(500).json({err: 'Could not log in user'})
      next() // res.status(200).json({status: 'Login succesful!'})
    })
  })(req, res, next)
}

// module.exports.logout = function (req, res, next) {
//   req.logout()
//   next() // res.status(200).json({status: 'Bye!'})
// }

module.exports.verifyToken = passport.authenticate('bearer', { session: false })

module.exports.createToken = function (req, res) {
  // Asynchronous token generator
  var tokenBytes = 8
  require('crypto').randomBytes(tokenBytes, function (err, buffer) {
    if (err) throw err
    var token = parseInt(buffer.toString('hex'), 16)
    // Update token field
    User.findById(req.user._id, function (err, user) {
      if (err) err
      user.token = token
      console.log('The user ' + user.username + ' has new token: ' + user.token)
      // Update user
      user.save(function (err) {
        if (err) return err
        res.status(200).json(user)
      })
    })
  })
}

module.exports.removeToken = function (req, res) {
  User.findById(req.user._id, function (err, user) {
    if (err) return err
    // Delete token
    user.token = undefined
    user.save(function (err) {
      if (err) return err
      console.log('Token has been removed from user ' + user.username)
      res.status(200).json({status: 'Bye ' + user.username})
    })
  })
}
