const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const dev = require('../routes/dev')

module.exports = function(app) {

    
    // BodyParser
    app.use(bodyParser.json({
        limit: '5mb'
    }))
    app.use(bodyParser.urlencoded({
        limit: '5mb',
        extended: false
    }))

    app.use(express.static('uploads'))
    // app.use(express.static('resources'))
    // Router
    // Development
    app.use('/dev', dev)
}