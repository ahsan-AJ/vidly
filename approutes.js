'use strict';

const routes = require('./routes/index')();

function appRoutes(app) {

    app.use('/api/genres', routes.genres);
    app.use('/api/customers', routes.customer)
    app.use('/api/movies', routes.movies);
    app.use('/api/rentals', routes.rentals);
    app.use('/api/users', routes.users);
    app.use('/api/auth',routes.auth);
}

module.exports = appRoutes;