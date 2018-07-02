const statusHelper = require('../helpers/statuses');
const Joi = require('joi');
const success = statusHelper.sendSuccessStatus;
const failure = statusHelper.sendErrorStatus;

const Customer = require('../models/Customer');


function _validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).required(),
        phone: Joi.string().required(),
    }
    return Joi.validate(customer, schema);
}

async function addCustomer(req, res, next) {

    const customerBody = {
        name: req.body.name,
        phone: req.body.phone,
    }
    const { error } = _validateCustomer(customerBody);

    if (error) {
        return failure(res, 404, error.details[0].message);

    }
    try {
        let customer = new Customer(customerBody);
        const result = await customer.save();
        return success(res, 200, result);

    } catch (error) {
        console.log('Error posting customer');
        console.log(error.message);
        return failure(res, 401, error.message)

    }

}

async function getCustomer(req, res, next) {

    try {
        const result = await Customer.find();
        return success(res, 200, result);
    } catch (error) {
        console.log('error getting all customers');
        console.log(error);
        return failure(res, 401, error.message)
    }
}


async function getCustomerById(req, res, next) {
    const id = req.params.id;
    const customer = await Customer.findById(id);
    if (!customer) {
        return failure(res, 404, 'customer not found');
    }
    return success(res, 200, { customer: customer });

}

async function updateCustomer(req, res, next) {
    const id = req.params.id;
    const customerBody = {
        name: req.body.name,
        phone: req.body.phone,
    }



    const { error } = _validateCustomer(customerBody);
    if (error) {
        return failure(res, 404, error.details[0].message);
    }

    const customer = await Customer.findByIdAndUpdate(id, customerBody, { new: true });
    if (!customer) failure(res, 404, 'customer not found')

    return success(res, 200, { message: 'customer updated', customer: customer });

}

async function deleteCustomer(req, res, next) {

    const id = req.params.id;


    const customer = await Customer.findByIdAndRemove(id);
    if (!customer) failure(res, 404, 'Genre not found')

    return success(res, 200, { message: 'customer deleted', customer: customer });
}

module.exports = {
    addCustomer: addCustomer,
    updateCustomer: updateCustomer,
    deleteCustomer: deleteCustomer,
    getCustomerById: getCustomerById,
    getCustomer: getCustomer
}