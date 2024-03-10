const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin.controller')
const imageUploadMiddleware = require('../middleware/image-upload')
router.get('/products', adminController.getProducts );

router.get('/products/new', adminController.getNewProduct);

router.post('/products', imageUploadMiddleware , adminController.createNewProduct);
// we dont need /admin because we registered it in app.js
// we extract the file we wanna upload via multermiddleware

router.get('/products/:id', adminController.getUpdateProduct)
//add dynamic URL route which we add in the admin controller via method
router.post('/products/:id', imageUploadMiddleware, adminController.updateProduct)

router.delete('/products/:id', adminController.deleteProduct)//use delete so that the post paths dont clash

router.get('/orders', adminController.getOrders);



router.patch('/orders/:id', adminController.updateOrder);

module.exports = router;