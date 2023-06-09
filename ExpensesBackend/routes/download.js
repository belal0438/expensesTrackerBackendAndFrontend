


const path = require('path');
const express = require('express');

const controllerDownload = require('../controllers/dowload');
const authorization = require('../authorization/author');

const router = express.Router();


router.get('/getDownloadUrl', authorization.Authenticate, controllerDownload.GetDownloadedUrl)

router.get('/Download', authorization.Authenticate, controllerDownload.downloadExpensesData);

module.exports = router