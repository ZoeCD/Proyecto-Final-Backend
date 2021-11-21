const mongoose = require('mongoose')

const DestinationSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: [50, "Error 422: InvalidBodyException.\nName must be between 5 and 50 characters"],
        minLenght: [5, "Error 422: InvalidBodyException.\nName must be between 5 and 50 characters"],
        required: true
    },
    type: {
        type: String,
        enum: {
            values: ['City', 'Monument', 'Activity'],
            message: 'Error 422: InvalidBodyException. Must choose from one of these types: City, Monument, or Activity'
        },
        required: true
    },
    description: {
        type: String,
        maxLength: [250, "Error 422: InvalidBodyException.\nDescription must be between 10 and 250 characters"],
        minLenght: [10, "Error 422: InvalidBodyException.\nDescription must be between 10 and 250 characters"],
    },
    price: Number, 
    done: Boolean,
    owner: String,
}, {collection:'destination'})

module.exports = mongoose.model('destination', DestinationSchema)