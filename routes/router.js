
const path = require('path');
const express = require('express');

const controllerData = require('../controllers/controller')
const router = express.Router();

router.get('/user',(req, res, next) =>{
    res.sendFile(path.join(__dirname,'../','views', 'user.html'));
})
router.get('/login',(req, res, next) =>{
    res.sendFile(path.join(__dirname,'../','views', 'login.html'));
})
router.post('/user', controllerData.PostNewUserData);
router.post('/login',controllerData.GetuserDataAndlogin);

module.exports = router;