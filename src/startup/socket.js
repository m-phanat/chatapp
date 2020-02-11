const mongoose = require('mongoose')

module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('connected: ', socket.id)


        socket.on('disconnect', () => {
            console.log('disconnect: ', socket.id)
        })
    })
}