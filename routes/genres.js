'use strict';
const router = require('express').Router();
// const router = express.Router();
const genreController = require('../controllers/genre.controller');


router.get('/', genreController.getGenres);

// Find a genre by id
router.get('/:id', genreController.getGenreById);

// post a genre
router.post('/', genreController.addGenre);

// Update a genre by id
router.put('/:id', genreController.updateGenre);

// Delete a genre by id
router.delete('/:id', genreController.deleteGenre);

// console.log(router);

module.exports = router;