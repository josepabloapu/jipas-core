var passport = require('passport')
var User = require('../models/user.js')

module.exports.getAllUsers = function (req, res) {
  User.find(function (err, users) {
    if (err) { res.send(err) }
    res.json(users)
  })
}

module.exports.getUserById = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) { res.send(err) }
    res.status(200).json(user)
  })
}

module.exports.updateUserById = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) return err
    var key
    for (key in req.body) {
      user[key] = req.body[key]
    }
    user.save(function (err) {
      if (err) return err
      res.send(user)
    })
  })
}

module.exports.deleteUserById = function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err) {
    if (err) { res.send(err) }
    res.status(200).json({ status: 'The user has been deleted' })
  })
}

module.exports.getSelf = function (req, res) {
  User.findById(req.user._id, function (err, user) {
    if (err) return err
    res.status(200).json(user)
  })
}

module.exports.updateSelf = function (req, res) {
  User.findById(req.user._id, function (err, user) {
    if (err) return err
    var key
    for (key in req.body) {
      user[key] = req.body[key]
    }
    user.save(function (err) {
      if (err) return err
      res.send(user)
    })
  })
}

module.exports.deleteSelf = function (req, res) {
  User.findByIdAndRemove(req.user._id, function (err) {
    if (err) { res.send(err) }
    res.status(200).json({ status: 'The user has been deleted' })
  })
}

module.exports.createSelfGreenUser = function (req, res) {
  var userToBeCreated = {
    username: req.body.username,
    name: req.body.name,
    role: 'green',
    originator: req.user._id
  }
  User.register(new User(userToBeCreated),
  req.body.password, function (err, user) {
    if (err) return res.status(500).json({err: err})
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json(user)
    })
  })
}

module.exports.getSelfAllGreenUsers = function (req, res) {
  User.find({'originator': req.user._id},
    function (err, greenusers) {
      if (err) return err
      res.status(200).json(greenusers)
    })
}

module.exports.getSelfGreenUser = function (req, res) {
  User.findOne({'_id': req.params.id, 'originator': req.user._id},
    function (err, greenuser) {
      if (err) return err
      res.status(200).json(greenuser)
    })
}

module.exports.updateSelfGreenUser = function (req, res) {
  User.findOne({'_id': req.params.id, 'originator': req.user._id},
  function (err, user) {
    if (err) return err
    var key
    for (key in req.body) {
      user[key] = req.body[key]
    }
    user.save(function (err) {
      if (err) return err
      res.send(user)
    })
  })
}
module.exports.deleteSelfGreenUser = function (req, res) {
  User.findOneAndRemove({'_id': req.params.id, 'originator': req.user._id},
    function (err) {
      if (err) { res.send(err) }
      res.status(200).json({ status: 'The user has been deleted' })
    })
}

module.exports.setValidTrue = function (req, res, next) {
  User.findByIdAndUpdate(req.user._id, {
    $set: {
      valid: true
    }
  }, function (err, user) {
    if (err) return err
    next()
  })
}

module.exports.setValidFalse = function (req, res) {
  User.findByIdAndUpdate(req.user._id, {
    $set: {
      valid: false
    }
  }, function (err, user) {
    if (err) return err
    res.send('The user is now invalid!')
  })
}
