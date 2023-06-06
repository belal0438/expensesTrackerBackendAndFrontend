


const path = require('path');
const express = require('express');

const controllerDownload = require('../controllers/dowload');
const authorization = require('../authorization/author');

const router = express.Router();


router.get('/download/getDownloadUrl', authorization.Authenticate, controllerDownload.GetDownloadedUrl)

router.get('/user/Download', authorization.Authenticate, controllerDownload.downloadExpensesData);


module.exports = router