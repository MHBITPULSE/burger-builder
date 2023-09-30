const express = require('express')

const router = express.Router();

const authorize = require('../middlewares/authorize');
const { initPayment, ipn, paymentSuccess } = require('../controllers/payment.controllers');

router.get('/', authorize, initPayment)
router.post('/ipn', ipn)
router.post('/success', paymentSuccess)
router.get('/success', paymentSuccess)


module.exports = router