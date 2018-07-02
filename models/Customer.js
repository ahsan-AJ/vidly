const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    phone: {
        type: String,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('Customer', customerSchema);