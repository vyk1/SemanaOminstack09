const express = require('express');
const routes = require('./routes')
const app = express();
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://developer:developer@cluster0-dqw7t.mongodb.net/semana09', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// req.query -> filtros
// req.params -> edicao, deleção
// req.body -> (geralmente json) criação e edição
// avisa que vai usar json
app.use(express.json());
app.use(routes)

// json nãolê multipart form data
// multer!

app.listen(3333);