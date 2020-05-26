const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const { User } = require('./models/User')

const config = require("./config/key")

// application/x-www-from-urlencodeted 타입으로 된 것을 분석해서 가지고 옴
app.use(bodyParser.urlencoded({extended: true}));
// application/json 타입으로 된 것을 분석해서 가지고 옴
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connect success'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!!!'))

app.post('/register', (req, res) => {
  // 회원 가입할때 필요한 정보들을 clinet 에서 가져오면
  // 그것들을 데이터베이스에 넣어 주는 함수
  const user = new User(req.body)
  user.save((err, userinfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})


app.listen(port, () => {
  console.log(`http://localhost:1800`)
})