'use strict';
const router = require('express').Router();
// const router = express.Router();
const rentalController = require('../controllers/rental.controller');


router.get('/', rentalController.getRentals);

// Find a rental by id
router.get('/:id', rentalController.getRentalsById);

// post a rental
router.post('/', rentalController.addRental);

// Update a rental by id
router.put('/:id', rentalController.updateRental);

// Delete a rental by id
router.delete('/:id', rentalController.deleteRental);

// console.log(router);

module.exports = router;