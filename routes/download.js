


const path = require('path');
const express = require('express');

const controllerDownload = require('../controllers/dowload');
const authorization = require('../authorization/author');

const router = express.Router();



router.get('/user/Download', authorization.Authenticate, controllerDownload.downloadExpensesData);


module.exports = router