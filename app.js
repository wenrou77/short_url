const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
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

//渲染首頁
app.get('/', (req, res) => {
  res.render('index')
})

//update短網址資料
///輸入的網址若不存在於資料庫，則新增一筆「原始網址(urlIn) & 短網址序號(urlOut)」
// 若存在，則從資料庫中渲染短網址
app.post('/result', (req, res) => {
  const host = req.headers.host
  const urlIn = req.body.urlIn
  const urlOut = generateRandomword(5)
  Shorturl.find()
    .lean()
    .then(datas => {
      const urlExisted = datas.find(data => data.urlIn === urlIn)
      if (urlExisted === undefined) {
        return Shorturl.create({ urlIn, urlOut })
          .then(() => res.render('result', { urlIn, urlOut, host }))
      } else {
        res.render('result', { urlIn, urlOut: urlExisted.urlOut, host })
      }
    })
    .catch(err => console.log(err))
})

//將短網址導向原本網址
app.get('/:urlOut', (req, res) => {
  const { urlOut } = req.params
  return Shorturl.findOne({ urlOut })
    .lean()
    .then(data => res.redirect(data.urlIn))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`App is running on http:localhost:${port}`)
})