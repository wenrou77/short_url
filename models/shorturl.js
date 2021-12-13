const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shorturlSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('Shorturl', shorturlSchema)