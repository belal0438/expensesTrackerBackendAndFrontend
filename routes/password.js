
const path = require('path');
const express = require('express');

const controllerforgetpass = require('../controllers/forgotpassword');

const router = express.Router();

router.use('/ForgetPassword',controllerforgetpass.ForgetPassword);

router.get('/reset_password/:id', controllerforgetpass.reset_password)

router.get('/update_password/:resetpassid', controllerforgetpass.update_password)

module.exports = router