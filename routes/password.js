
const path = require('path');
const express = require('express');

const controllerforgetpass = require('../controllers/forgotpassword');

const router = express.Router();

router.post('/password/forgotpassword',controllerforgetpass.forgetpassword);

module.exports = router