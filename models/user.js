var mongoose = require('mongoose')
var Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose')

var userSchema = new Schema({
  username: {type: String, required: true},
  name: {type: String, required: true},
  role: {type: String, required: true, default: 'green'},
  valid: {type: Boolean, required: true, default: false},
  banned: {type: Boolean, required: true, default: false},
  originator: {type: String, required: false},
  token: {type: Number, required: false},
  category: {
    orientation: {type: Number, required: false},
    memory: {type: Number, required: false},
    language: {type: Number, required: false},
    calculus: {type: Number, required: false},
    praxias: {type: Number, required: false},
    gnosias: {type: Number, required: false}
  }
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('user', userSchema)
