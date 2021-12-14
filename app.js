const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000
const generateRandomword = require('./generate_randomword')
const Shorturl = require('./models/shorturl')

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
  Shorturl.find()
    .lean()
    .then(datas => {
      //查看輸入的網址是否已在資料庫中，若存在，則渲染已存入的短網址
      //若不存在，則存入資料庫，渲染出新的亂數短網址
      const urlExisted = datas.filter(data => data.urlIn === urlIn)
      if (urlExisted.length !== 0) {
        res.render('result', { urlIn, urlOut: urlExisted[0].urlOut })
      } else {
        return Shorturl.create({ urlIn, urlOut })
          .then(() => res.render('result', { urlIn, urlOut }))
          .catch(error => console.log(error))
      }
    })
    .catch(err => console.log(err))
})

app.listen(port, () => {
  console.log(`App is running on http:localhost:${port}`)
})