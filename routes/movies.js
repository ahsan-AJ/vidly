'use strict';
const router = require('express').Router();
// const router = express.Router();
const movieController = require('../controllers/movie.controller');


router.get('/', movieController.getMovies);

// Find a movie by id
router.get('/:id', movieController.getMovieById);

// post a movie
router.post('/', movieController.addMovie);

// Update a movie by id
router.put('/:id', movieController.updateMovie);

// Delete a movie by id
router.delete('/:id', movieController.deleteMovie);

// console.log(router);

module.exports = router;