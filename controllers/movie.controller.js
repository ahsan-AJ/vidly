'use strict';
const { Movie, validateMovie } = require('../models/Movie');
const status = require('../helpers/statuses');
const { Genre } = require('../models/Genre');

const success = status.sendSuccessStatus;
const failure = status.sendErrorStatus;

// add movie
async function addMovie(req, res, next) {
    const { error } = validateMovie(req.body);
    if (error) return failure(res, 400, error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return failure(res, 400, 'Invalid Genre');

    try {
        let movie = new Movie({
            title: req.body.title,
            genre: {
                _id: genre.id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        });


        let result = await movie.save();
        return success(res, 200, { message: 'Movie added', movie: result });
    } catch (error) {
        console.log('Error')
        return failure(res, 401, error.message)
    }


}

// get movies
async function getMovies(req, res, next) {
    const movies = await Movie.find().sort('name');
    return success(res, 200, { message: 'movies found', movies: movies });
}
// get movie by id
async function getMovieById(req, res, next) {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    if (!genre) {
        return failure(res, 404, 'movie not found');
    }
    return success(res, 200, { movie: movie });

}
// update movie 
async function updateMovie(req, res, next) {

    const { error } = validateMovie(req.body);
    if (error) return failure(res, 400, error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return failure(res, 400, 'Invalid Genre');

    try {
        let movie = await Movie.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            genre: {
                _id: genre.id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }, { new: true });

        if (!movie) return failure(res, 404, 'The movie with given id is not found')


        return success(res, 200, { message: 'Movie updated', movie: movie });
    } catch (error) {
        console.log('Error')
        return failure(res, 401, error.message)
    }




}
// delete movie
async function deleteMovie(req, res, next) {
    const movie = await Movie.findOneAndRemove(req.params.id);
    if (!movie) return failure(res, 404, 'Movie not found');

    return success(res, 200, { message: 'Movie deleted', movie: movie });
}


module.exports = {
    addMovie: addMovie,
    getMovies: getMovies,
    getMovieById: getMovieById,
    updateMovie: updateMovie,
    deleteMovie: deleteMovie
}