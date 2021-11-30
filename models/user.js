const mongoose = require('mongoose')

const DestinationSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {collection:'users'})

module.exports = mongoose.model('user', DestinationSchema)