
const path = require('path');
const express = require('express');

const controllerData = require('../controllers/controller')
const router = express.Router();



router.post('/user', controllerData.PostNewUserData);
router.post('/login',controllerData.GetuserDataAndlogin);

router.post('/expenses',controllerData.PostExpensesData);
router.delete('/delete/:id',controllerData.DeleteExpenses);
router.get('/getexpenses',controllerData.GetExpensesData);

module.exports = router;