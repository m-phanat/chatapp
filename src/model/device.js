const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DeviceRoomStatus = require('./devicrRoomStatus').schema

const Device = new Schema({
    type: String,
    uuid: {
        type: String,
        required: true
    },
    socketId: {
        type: String,
        default: null
    },
    active: {
        type: Boolean,
        default: false
    },
    logout: {
        type: Boolean,
        default: false
    },
    fcmToken: {
        type: String,
        default: null
    },
    firebaseToken: {
        type: String,
        default: null
    },
    deviceType: {
        type: String,
        enum: ['Phone', 'Tablet'],
        default: 'Phone'
    },
    operationType: {
        type: String,
        enum: ['iOS', 'Android']
    },
    operationVersion: {
        type: String
    },
    appVersion: {
        type: String
    },
    deviceModel: {
        type: String
    },
    deviceName: {
        type: String
    },
    macAddress: {
        type: String,
        default: null
    },
    currentDevice: {
        type: Boolean,
        default: false
    },
    notification: {
        type: Boolean,
        default: true
    },
    rooms: [DeviceRoomStatus],
    statusLogs: [{
        active: {
            type: Date,
            default: null
        },
        inactive: {
            type: Date,
            default: null
        }
    }]
})

module.exports = mongoose.model('Device', Device)