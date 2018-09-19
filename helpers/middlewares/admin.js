const failure = require('../statuses').sendErrorStatus;
module.exports = function(req, res, next) {
    // 401 unauthorized
    // 403 forbidden
    if (req.user.isAdmin) return failure(res, 403, 'Access denied');

    next();
}