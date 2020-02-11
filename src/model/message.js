const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Message = new Schema({
    text: {
        type: String
    },
    createdDatetime: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    reads: [{
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }],
    numberOfUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }],
    kind: {
        type: String,
        enum: ['Text', 'AttributedText', 'Photo', 'Video', 'Location', 'Emoji', 'Sticker'],
        default: 'Text'
    },
    media: {
        type: String,
        default: null
      },
      sizeWidth: {
        type: Number,
        default: 0
      },
      sizeHeight: {
        type: Number,
        default: 0
      },
      thumbnail: {
        type: String,
        default: null
      },
      isThumbnail: {
        type: Boolean,
        default: false
      },
      localId: {
        type: String,
        default: null
      }
})

module.exports = mongoose.model('Message', Message)