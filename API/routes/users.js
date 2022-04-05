const express = require('express')
const router = express.Router();

// const auth = require('../middlewares/auth.js')

const controllers = require('../controllers/users.js')


router.post('/signup', controllers.signup);
router.post('/login', controllers.login);

module.exports = router;