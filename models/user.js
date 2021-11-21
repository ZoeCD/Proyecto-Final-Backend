var mongoose = require('mongoose');

module.exports = mongoose.model('user', mongoose.Schema({
    sub: String,
    bucketlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }]
}));