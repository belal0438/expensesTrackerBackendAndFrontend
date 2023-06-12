

const path = require('path');
const express = require('express');

const controllerExpenses = require('../controllers/expenses');
const authorization = require('../authorization/author');
const router = express.Router();



router.post('/postexpenses', authorization.Authenticate, controllerExpenses.PostExpensesData);
router.delete('/delete/:id', authorization.Authenticate, controllerExpenses.DeleteExpenses);

router.get('/getexpenses', authorization.Authenticate, controllerExpenses.GetExpensesData);

router.get('/pagination', authorization.Authenticate, controllerExpenses.paginateData);


module.exports = router