const _ = require('lodash');
const statusHelper = require('../helpers/statuses');
const success = statusHelper.sendSuccessStatus;
const failure = statusHelper.sendErrorStatus;

const { User, validateUser } = require('../models/Users');

async function registerUser(req, res, next) {
    const { error } = validateUser(req.body);
    if (error) return failure(res, 400, error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return failure(res, 400, 'email already registered');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        await user.save();
        const _json = _.pick(user, ["_id", "name", "email"]);
        return success(res, 200, { data: _json })
    } catch (error) {
        return failure(res, 500, { error: error })
    }
}

function login(req, res, next) {}



module.exports = {
    registerUser: registerUser,
    login: login
}