
const mongoose = require('mongoose')
// const config = require('config')

module.exports = function() {
    // const db = `mongodb://localhost/${config.get('db.name')}`
    const mongooseURL = `mongodb://localhost/chat-example`

    
    mongoose.set('useCreateIndex', true)
    mongoose.connect(mongooseURL, { 
        useNewUrlParser: true,
    useUnifiedTopology: true
    }).then((mongo) => {
        console.log('Connected to MongoDb: ', mongooseURL)
    }).catch((err) => {
        console.log('Could not connect to MongoDb...', err)
    })
}