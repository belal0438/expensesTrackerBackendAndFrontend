
const path = require('path');
const express = require('express');

const controllerUser = require('../controllers/user')
const controllerExpenses = require('../controllers/expenses');
const controllerLogin = require('../controllers/login');
const authorization = require('../authorization/author');
const controllerpurchase = require('../controllers/purchase');
const router = express.Router();



router.post('/user', controllerUser.PostNewUserData);
router.post('/login', controllerLogin.GetuserDataAndlogin);

router.post('/expenses', authorization.Authenticate, controllerExpenses.PostExpensesData);
router.delete('/delete/:id', authorization.Authenticate, controllerExpenses.DeleteExpenses);
router.get('/getexpenses', authorization.Authenticate, controllerExpenses.GetExpensesData);



router.get('/purchasepremium', authorization.Authenticate, controllerpurchase.purchasepremium);
router.post('/update_transation_status', authorization.Authenticate, controllerpurchase.updateTransactionStatus);


module.exports = router;