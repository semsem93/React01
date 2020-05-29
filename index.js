const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const { User } = require('./models/User')
const cookieParser = require('cookie-parser')
const { auth } = require('./middleware/auth')

const config = require("./config/key")

// application/x-www-from-urlencodeted 타입으로 된 것을 분석해서 가지고 옴
app.use(bodyParser.urlencoded({extended: true}));
// application/json 타입으로 된 것을 분석해서 가지고 옴
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connect success'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!!!'))

app.post('/api/users/register', (req, res) => {
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

app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 db에서 있는지 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    // 이메일 없음
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다"
      })
    }

    // 이메일 있음
    // 비밀번호가 같은지 확인
    user.comparePassword(req.body.password, (err, isMatch) =>{
      // 비밀번호 다름
      if(!isMatch)
        return res.json({ 
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다"
        })

      // 비밀번호 같음  
      // tocken 생성
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        // 토큰을 쿠키에 저장함
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id
        })
      })
    })
  })
})

app.get('/api/users/auth', auth, (req, res) => {
  // 여기까지 미들웨어를 통과해왔다는 얘기는 Auth가 true라는 말이다.
  res.status(200).json({
    _id : req.user._id,
    name: req.user.name,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth : true,
    email: req.user.email,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id}, {
    token: ""
  }, (err, user) => {
    if(err) return res.json({ success: false, err});
    return res.status(200).send({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`http://localhost:5000`)
})