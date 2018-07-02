const express = require("express");
const Joi = require("joi");
const app = express();
const logger = require('./logger');
const helmet = require("helmet");
const morgan = require('morgan');
const db = require('./db');
const PORT = process.env.PORT || 3000;


app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json()); // req.body
app.use(express.urlencoded({ extended: true })); // true for parsing array and objects too
app.use(express.static('public'));
// next = next middleware function in the pipeline
app.use(logger);

require('./approutes')(app); // must call routes at the end of all middlewares






app.listen(PORT, () => { `Server is listening at ${PORT}` });