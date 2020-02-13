const mongoose = require('mongoose')

module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('connected: ', socket.id)

        socket.on('news', (dict) => {
            console.log(`dict: ${dict}`)
            var name = dict['name']
            var age = dict['age']
            console.log(`name: ${name}, age: ${age}`)
            io.emit('paper-ack', dict)
        })

        socket.on('news-ack', function(dict, callback) {
            var data = {
                name: 'NMAE_____D',
                profile: 'PROFILE___D'
            }
            io.emit('paper-ack', [], [], data)
            callback('woot')
        })

        socket.on('disconnect', () => {
            console.log('disconnect: ', socket.id)
        })
    })
}