const statusHelper = require('../helpers/statuses');
const Joi = require('joi');
const success = statusHelper.sendSuccessStatus;
const failure = statusHelper.sendErrorStatus;
const asyncMiddleware = require('../helpers/middlewares/async');

const { Genre } = require('../models/Genre');


function _validateGenres(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}



async function addGenre(req, res) {
    console.log(req.body);
    const name = req.body.name;

    const { error } = _validateGenres({ name });

    if (error) {
        return failure(res, 404, error.details[0].message);

    }
    try {
        let genre = new Genre({ name: name });
        const result = await genre.save();
        return success(res, 200, result);

    } catch (error) {
        console.log('Error posting genre');
        console.log(error.message);
        return failure(res, 401, error.message)

    }

}

async function getGenres(req, res, next) {

    try {
        const result = await Genre.find().sort('name');
        return success(res, 200, result);
    } catch (error) {
        console.log('error getting all genres');
        console.log(error);
        return failure(res, 401, error.message)
    }
}


async function getGenreById(req, res, next) {
    const id = req.params.id;
    const genre = await Genre.findById(id);
    if (!genre) {
        return failure(res, 404, 'genre not found');
    }
    return success(res, 200, { genre, genre });

}

async function updateGenre(req, res, next) {
    const id = req.params.id;
    const name = req.body.name;
    const { error } = _validateGenres({ name });
    if (error) {
        return failure(res, 404, error.details[0].message);
    }

    const genre = await Genre.findByIdAndUpdate(id, { name: name }, { new: true });
    if (!genre) failure(res, 404, 'Genre not found')

    return success(res, 200, { message: 'genre updated', genre: genre });

}

async function deleteGenre(req, res, next) {

    const id = req.params.id;


    const genre = await Genre.findByIdAndRemove(id);
    if (!genre) failure(res, 404, 'Genre not found')

    success(res, 200, { message: 'genre deleted', genre: genre });
}

module.exports = {
    addGenre: addGenre,
    updateGenre: updateGenre,
    deleteGenre: deleteGenre,
    getGenreById: getGenreById,
    getGenres: getGenres
}