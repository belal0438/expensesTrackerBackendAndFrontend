
const express = require('express');
const premiumfeaturController = require('../controllers/premiumfeatur');
const authorization = require('../authorization/author');

const router = express.Router();

router.get('/premium/showLeaderBoard', authorization.Authenticate, premiumfeaturController.getUserLeaderBoard);

module.exports = router