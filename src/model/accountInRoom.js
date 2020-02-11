const mongoose = require('mongoose')

const Schema = mongoose.Schema


const AccountInRoom = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    active: {
        type: Boolean,
        default: false
    },
    newMember: {
        type: Boolean,
        default: false
    },
    startMessageId: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },
    lastMessageId: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },
    startAtMessage: {
        type: Number,
        default: 0
    },
    numberOfMessages: {
        type: Number,
        default: 0
    },
    notification: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('AccountInRoom', AccountInRoom)