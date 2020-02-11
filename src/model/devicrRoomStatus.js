const mongoose = require('mongoose')

const Schema = mongoose.Schema



const DeviceRoomStatus = new Schema({
    isShow: {
        type: Boolean,
        default: true
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    },
    startMessageId: {
        type: Schema.Types.ObjectId,
        ref: 'Message',
        default: null
    },
    lastMessageId: {
        type: Schema.Types.ObjectId,
        ref: 'Message',
        default: null
    },
    newMember: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('DeviceRoomStatus', DeviceRoomStatus)