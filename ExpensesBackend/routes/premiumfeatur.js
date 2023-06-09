
const express = require('express');
const premiumfeaturController = require('../controllers/premiumfeatur');
const authorization = require('../authorization/author');
const controllerpurchase = require('../controllers/purchase')

const router = express.Router();

router.get('/showLeaderBoard', authorization.Authenticate, premiumfeaturController.getUserLeaderBoard);


router.get('/purchasepremium', authorization.Authenticate, controllerpurchase.purchasepremium);
router.post('/update_transation_status', authorization.Authenticate, controllerpurchase.updateTransactionStatus);


module.exports = router
