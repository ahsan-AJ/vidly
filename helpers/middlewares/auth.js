const failure = require('../statuses').sendErrorStatus;
const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const bearerToken = req.header(`X-Auth-Token`);
    // console.log(bearerToken);
    if (!bearerToken) {
        return failure(res, 401, 'Access denied. No access token provided');
    }
    const token = bearerToken.split(' ');
    // console.log(token);
    if (!token) {
        return failure(res, 401, 'Access denied. No access token provided');
    }

    if (token[0] !== 'Bearer') {
        return failure(res, 401, 'Invalid Token');
    }

    if (!token[1]) {
        return failure(res, 401, 'Invalid Token');
    }
    try {
        const decoded = jwt.verify(token[1], config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (ex) {
        return failure(res, 400, 'Invalid Token');
    }
}

module.exports = {
    auth: auth
}