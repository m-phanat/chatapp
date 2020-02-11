const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AccountInRoom = require('./accountInRoom').schema

const Room = new Schema({
    name: {
        type: String,
        default: null
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    users: [AccountInRoom]
})

module.exports = mongoose.model('Room', Room)