const express = require('express');
const routes = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

const app = express()
const server = http.Server(app)
// agora tbm ouve websocket
const io = socketio(server)

// em produção é melhor colocar o BD como redis
const connectedUsers = {}

mongoose.connect('mongodb+srv://developer:developer@cluster0-dqw7t.mongodb.net/semana09', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// toda vez que logar
io.on('connection', socket => {
    const { user_id } = socket.handshake.query

    connectedUsers[user_id] = socket.id
})
// adicionar funcionalidade na rota
// todas as rotas tem essa funcionalidade
app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers
    // next continua o fluxo normal da app
    return next()
})

app.use(cors())
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

server.listen(3333);