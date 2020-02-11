const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Message = require('./message').schema

let GroupMessage = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    
    messages: [Message]
}, {
    autoCreate: true
})

module.exports = mongoose.model('GroupMessage', GroupMessage)