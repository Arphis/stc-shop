const express = require('express');
const customerController = require('../controllers/customer.controller');

const router = express.Router();
router.get('/about', customerController.getAbout)
router.get('/', customerController.getTrendingProducts, customerController.getNewProducts);
router.get('/', customerController.getNewProducts)
router.get('/401', function(req, res) {
    res.status(401).render('shared/401');
})
router.get('/403', function(req,res) {
    res.status(403).render('shared/403')
})


module.exports = router;