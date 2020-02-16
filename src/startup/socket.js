const mongoose = require('mongoose')

module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('connected: ', socket.id)

        socket.on('news', (dict) => {
            console.log(`dict: ${dict}`)
            io.emit('paper-ack', dict)
        })

        socket.on('news-ack', function(dict, callback) {
            
            callback('woot')
        })
        socket.on('disconnect', () => {
            console.log('disconnect: ', socket.id)
        })
    })
}