
const path = require('path');
const express = require('express');

const controllerUser = require('../controllers/user')
const controllerLogin = require('../controllers/login');
const authorization = require('../authorization/author');
;
const router = express.Router();



router.post('/signup', controllerUser.PostNewUserData);
router.get('/getUserdata', authorization.Authenticate,controllerUser.GetUserData);
router.post('/login', controllerLogin.GetuserDataAndlogin);

module.exports = router;