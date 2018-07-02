const router = require('express').Router();
// const router = express.Router();
const customerController = require('../controllers/customer.controller');

router.get('/', customerController.getCustomer);

// Find a genre by id
router.get('/:id', customerController.getCustomerById);

// post a genre
router.post('/', customerController.addCustomer);

// Update a genre by id
router.put('/:id', customerController.updateCustomer);

// Delete a genre by id
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;