const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shorturlSchema = new Schema({
  urlIn: {
    type: String,
    required: true
  },
  urlOut: {
    type: String
  }
})
module.exports = mongoose.model('Shorturl', shorturlSchema)