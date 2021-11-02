const express = require('express')
const app = express()
const port = 8080

const { User } = require("./models/User");

app.use(express.urlencoded({extended: true}));

app.use(express.json());

const config = require('./config/key');

const mongoose = require('mongoose')

mongoose.connect(config.mongoURI,)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {

  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body)

  // MongoDB에서 온 메소드
  user.save((err, userInfo) => {
    if(err) return res.json({ success : false, err})
    return res.status(200).json({
      success : true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})