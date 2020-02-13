const mongoose = require('mongoose')
const express = require('express')

module.exports = function(router) {
    router.post('/', (req, res) => {
        res.json(req.body)
    })

    router.post('/emit', (req, res) => {
        console.log('/dev/emit')
        var io = req.app.get('socketio')
        io.emit('paper-ack', 'CatFat')
    })
}