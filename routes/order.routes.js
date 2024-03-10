const express = require('express');

const router = express.Router();

const ordersController = require('../controllers/orders.controller')

router.post('/order', ordersController.addOrder)


router.get('order/success', ordersController.getSuccess)
router.get('order/failure', ordersController.getFailure)
module.exports = router;