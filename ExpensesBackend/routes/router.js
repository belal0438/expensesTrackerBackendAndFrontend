
const path = require('path');
const express = require('express');

const controllerUser = require('../controllers/user')
const controllerLogin = require('../controllers/login');
const authorization = require('../authorization/author');
const controllerpurchase = require('../controllers/purchase');
const router = express.Router();



router.post('/user', controllerUser.PostNewUserData);
router.get('/getUserdata', authorization.Authenticate,controllerUser.GetUserData);
router.post('/login', controllerLogin.GetuserDataAndlogin);



router.get('/purchasepremium', authorization.Authenticate, controllerpurchase.purchasepremium);
router.post('/update_transation_status', authorization.Authenticate, controllerpurchase.updateTransactionStatus);


module.exports = router;