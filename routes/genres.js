'use strict';
const router = require('express').Router();
// const router = express.Router();
const genreController = require('../controllers/genre.controller');
const auth = require('../helpers/middlewares/auth').auth;
const admin = require('../helpers/middlewares/admin');

router.get('/', genreController.getGenres);

// Find a genre by id
router.get('/:id', genreController.getGenreById);

// post a genre
router.post('/', auth, genreController.addGenre);

// Update a genre by id
router.put('/:id', genreController.updateGenre);

// Delete a genre by id
router.delete('/:id', [auth, admin], genreController.deleteGenre);

// console.log(router);

module.exports = router;