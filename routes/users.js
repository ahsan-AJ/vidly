const router = require('express').Router();
const userController = require('../controllers/user.controller');
const auth = require('../helpers/middlewares/auth').auth;

router.post('/', userController.registerUser);

router.get('/me', auth, userController.current);

module.exports = router;