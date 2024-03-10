const express = require('express');

const router = express.Router();

const cartController = require('../controllers/cart.controller')

router.post('/items', cartController.addCartItem)

router.get('/', cartController.getCart); //cart

router.patch('/items', cartController.updatedCartItem);//patch because we update parts of existing data

module.exports = router;