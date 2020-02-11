const express = require('express')

// Express
const app = express()
const server = require('http').createServer(app)
// Router
require('./startup/routes')(app)
// Socket
const io = require('socket.io')(server, {
    pingInterval: 5000
})

// Port
const port = process.env.PORT || 8082

// MongoUrl
require('./startup/db')()

// Socket
app.set('socketio', io);
require('./startup/socket')(io)

server.listen(port, () => console.log(`Listening on port ${port}`))
module.exports = server