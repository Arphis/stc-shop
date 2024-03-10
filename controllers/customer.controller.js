
const Product = require('../models/product-model')
const { getNewProduct } = require('./admin.controller')

async function getTrendingProducts(req, res, next) {

try{

const msm = await Product.findById('65ecd60f97eec62bc936a9e5')
const brainSupport = await Product.findById('65ecd3f597eec62bc936a9de')
const collagenSupport = await Product.findById('65ecd43597eec62bc936a9df')
const d3 = await Product.findById('65ecd47197eec62bc936a9e0')
const fatBurner = await Product.findById('65ecd4ba97eec62bc936a9e1')
const glucosamine = await Product.findById('65ecd1976cfe5e4131dd4f90')
res.render('customer/products/landing-page',{
    msm:msm, 
    brainSupport:brainSupport, 
    collagenSupport:collagenSupport, 
    d3:d3,fatBurner:
    fatBurner,
    glucosamine:glucosamine
})
} catch (error) {
    next(error)
}

}

async function getNewProducts (req,res,next) {
    try {

        res.render('customer/products/all-products')
    }
    catch (error)
 {
    next(error)
 }}

// async function getMainPage (req, res, next) {
//     try {
//         const products = await Product.findAll();
//         res.render('customer/products/landing-page', {products:products});
//     } catch (error) {
//         next(error);
//     }

// }

async function getSortedProducts (req, res, next) {
    try {
    const type = req.query.type
    console.log(type)
const products = await Product.sortProducts(type)
        res.render('customer/products/sorted-products', {products:products})
    }

    catch (error) {
        next(error)
    }
}

async function getAbout (req,res, next) {

    try {res.render('shared/includes/about')}
    catch (error)
     {next(error)
    
}}

module.exports = {
    getNewProducts:getNewProducts,
        getTrendingProducts:getTrendingProducts,
        getSortedProducts:getSortedProducts,
        getAbout:getAbout
    }
    