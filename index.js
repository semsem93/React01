const express = require('express')
const app = express()
const port = 1800


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://semi:<sm2200mk>@cluster0-xalwm.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connect success'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('hello world'))

app.listen(port, () => {
  console.log(`http://localhost:1800`)
})