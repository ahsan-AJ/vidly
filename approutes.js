'use strict';

const routes = require('./routes/index')();

function appRoutes(app) {

    app.use('/api/genres', routes.genres);
    app.use('/api/customer', routes.customer)
}

module.exports = appRoutes;