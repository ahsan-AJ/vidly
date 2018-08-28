const jwt = require('jsonwebtoken');
const _ = require('lodash');
const Joi = require('joi');
const statusHelper = require('../helpers/statuses');
const success = statusHelper.sendSuccessStatus;
const failure = statusHelper.sendErrorStatus;

const { User } = require('../models/Users');

async function login(req, res, next) {
    const { error } = validateUser(req.body);
    if (error) return failure(res, 400, error.details[0].message);
  

    const user = await User.findOne({ email: req.body.email });
    if (!user) return failure(res, 400, 'Invalid email or password');

    console.log(user);
    
    try {
        const validPassword = await user.comparePassword(req.body.password);
        if(!validPassword) return failure(res,400,'Invalid Password');
        
       const token =  jwt.sign({_id: user._id},'$chunk')

        return success(res, 200, { token: token })
    } catch (error) {
        console.log(error);
        return failure(res, 500, { error: error })
    }
}

function validateUser(req) {
    const schema = {
        email: Joi.string().email().min(3).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(req, schema);
}





module.exports = {
    login: login
}