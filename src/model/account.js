const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema
const Device = require('./device').schema
const Account = new Schema({
    sqlId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    profileUrl: {
        type: String,
        default: null
    },
    displayName: {
        type: String,
        required: true
    },
    companyId: {
        type: String, 
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isOperation: {
        type: Boolean,
        default: false
    },
    badge: {
        type: Number,
        default: 0
    },
    allowDeviceType1: {
        type: Number,
        default: 1
    },
    allowDeviceType2: {
        type: Number,
        default: 1
    },
    devices: [Device]
})

Account.plugin(uniqueValidator)
module.exports = mongoose.model('Account', Account)