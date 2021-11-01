const express = require('express')
const app = express()
const port = 8080

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://kangsoonyong1234:1234@kangsoonyong1.5b7i9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! ~!1111!!!!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})