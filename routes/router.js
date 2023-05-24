
const path = require('path');
const express = require('express');

const controllerData = require('../controllers/controller')
const router = express.Router();

router.get('/login',(req, res, next) =>{
    res.sendFile(path.join(__dirname,'../','views', 'login.html'));
})

router.post('/login', controllerData.PostUserloginData);


module.exports = router;