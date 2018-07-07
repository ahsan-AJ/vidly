const statusHelper = require('../helpers/statuses');
const success = statusHelper.sendSuccessStatus;
const failure = statusHelper.sendErrorStatus;

const { User, validateUser } = require('../models/Users');

function registerUser(req, res, next) {
    const { error } = validate(req.body);

}

function login(req, res, next) {}



module.exports = {

}