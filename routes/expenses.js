

const path = require('path');
const express = require('express');

const controllerExpenses = require('../controllers/expenses');
const authorization = require('../authorization/author');
const router = express.Router();



router.post('/expenses/postexpenses', authorization.Authenticate, controllerExpenses.PostExpensesData);
router.delete('/expenses/delete/:id', authorization.Authenticate, controllerExpenses.DeleteExpenses);




router.get('/expenses/getexpenses', authorization.Authenticate, controllerExpenses.GetExpensesData);



module.exports = router