const Joi = require('joi');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 1024
    }

});

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().min(3).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user, schema);
}

exports.User = mongoose.model('User', UserSchema);
exports.validateUser = validateUser;