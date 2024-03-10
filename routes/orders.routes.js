const express = require('express');

const router = express.Router();

const ordersController = require('../controllers/orders.controller')

router.post('/', ordersController.addOrder)
router.get('/', ordersController.getOrders)

router.get('order/success', ordersController.getSuccess)
router.get('order/failure', ordersController.getFailure)
module.exports = router;