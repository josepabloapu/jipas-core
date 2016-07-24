var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ticketSchema = new Schema({
  name: {type: String, required: false},
  description: {type: String, required: false},
  notes: {type: String, required: false},
  category: {type: String, required: false},
  originator: {type: String, required: true, default: 'Admin'},
  amount: {type: String, required: false},
  place: {type: String, required: false},
  level: {type: String, required: false},
  // most adjust time to GMT -6
  datePublished: {type: Date, required: true, default: Date.now},
  image: {type: String, required: false}
})

module.exports = mongoose.model('ticket', ticketSchema)
