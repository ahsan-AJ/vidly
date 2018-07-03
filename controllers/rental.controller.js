const { Rental, validateRentals } = require('../models/MovieRental');
const { Movie } = require('../models/Movie');
const { Customer } = require('../models/Customer');
const status = require('../helpers/statuses');

const success = status.sendSuccessStatus;
const failure = status.sendErrorStatus;

async function getRentals(req, res, next) {
    const rentals = await Rental.find().sort('-dateOut');

    if (!rentals) return failure(res, 404, 'Unable to fetch rentals');

    return success(res, 200, rentals);
}

async function getRentalsById(req, res, next) {

    const id = req.params.id;
    const rental = await Rental.findById(id);

    if (!rental) return failure(res, 404, 'Unable to fetch rentals');

    return success(res, 200, { message: 'rental found', data: rental });

}

async function addRental(req, res, next) {
    const { error } = validateRentals(req.body);
    if (error) return failure(res, 400, error.details[0].message);

    // fetch customer by id 
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return failure(res, 404, 'Customer not found');

    // fetch movie by id 
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return failure(res, 404, 'movie not found');

    // check if movie is in stock
    if (movie.numberInStock === 0) return failure(res, 400, 'Movie out of stock');

    let rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone,
                isGold: customer.isGold
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        })
        // save the rental 
    let result = await rental.save();

    // decrement movie.inStock count by 1 using 2phase commit 


    return success(res, 200, { message: 'rental added', data: result });


}

async function updateRental(req, res, next) {}

async function deleteRental(req, res, next) {}




module.exports = {
    getRentals: getRentals,
    getRentalsById: getRentalsById,
    addRental: addRental,
    updateRental: updateRental,
    deleteRental: deleteRental
}