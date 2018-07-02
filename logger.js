function log(req, res, next) {

    console.log('Logging...');
    next(); // necessary for preventing the blockage of request 

}

module.exports = log;