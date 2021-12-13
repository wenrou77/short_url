const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const generateRandomword = require('./generate_randomword')

mongoose.connect('mongodb://localhost/short-url', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/result', (req, res) => {
  const urlIn = req.body.urlIn
  const urlTail = generateRandomword(5)
  const urlOut = "https://shortURL.com/" + urlTail
  res.render('result', { urlIn, urlOut })
})

app.listen(port, () => {
  console.log(`App is running on http:localhost:${port}`)
})