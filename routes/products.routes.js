const express = require('express');


const router = express.Router();

const productsController = require('../controllers/products-controller');
const customerController = require('../controllers/customer.controller');



router.get('/products',productsController.getAllProducts, );
//  router.get('/products', productsController.getAllProducts, );

router.get('/products/:id' , productsController.getProductDetails )
router.get('/product/:type' , customerController.getSortedProducts)


module.exports = router;