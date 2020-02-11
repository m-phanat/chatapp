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
    displayName: {
        type: String,
        required: true
    },
    companyId: {
        type: String, 
        required: true
    },
    badge: {
        type: Number,
        default: 0
    },
    devices: [Device]
})

Account.plugin(uniqueValidator)
module.exports = mongoose.model('Account', Account)