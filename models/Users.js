const Joi = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

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
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 1024
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
        default: 'male'
    },
    isAdmin: {
        type: Boolean
    }

});

UserSchema.pre('save', async function(next) {
    let user = this;

    if (!user.isModified('pasword')) return next(); // only hash if password is modified or new

    try {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }

})


UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}

UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

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