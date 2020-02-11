const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DeviceRoomStatus = require('./devicrRoomStatus').schema

const Device = new Schema({
    type: String,
    uuid: {
        type: String,
        required: true
    },
    rooms: [DeviceRoomStatus]
})

module.exports = mongoose.model('Device', Device)