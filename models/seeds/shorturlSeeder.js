const mongoose = require('mongoose')
const Shorturl = require('../shorturl')
mongoose.connect('mongodb://localhost/short-url', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})