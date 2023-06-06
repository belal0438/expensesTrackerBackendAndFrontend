
const path = require('path');
const express = require('express');

const controllerforgetpass = require('../controllers/forgotpassword');

const router = express.Router();

router.use('/password/forgotpassword',controllerforgetpass.forgetpassword);

router.get('/password/reset_password/:id', controllerforgetpass.reset_password)

router.get('/password/update_password/:resetpassid', controllerforgetpass.update_password)

module.exports = router