const Product = require('../models/product-model')


function getCart(req,res) {
res.render('customer/cart/cart')//the cart ll be available via res.locals in the template
}

async function addCartItem (req,res, next) {//this action is invoked by ajax reqs from inside js

 let product 
    try {
     product =  await  Product.findById(req.body.productId)}// we access this via Ajax request where we fetch the template via path and then we access the product.id
    //the id of the product in the database is equal to the id of product that we add to cart via ajax post req
     catch (error) { next(error)//built-in error handler middleware which we use to render our custom error pages
    return
    }
//product.id refers to product whose id is the same as url id and is in database, so existing product
const cart = res.locals.cart

cart.addItem(product);//the reason we can call addItem from cart.model is because the middleware ensures that
//we have res.locals.cart available as a property and it is based on our cart blueprint

req.session.cart = cart;//save the new updated cart into the session
//we would only need to call save() if we have some action like redirect after that
 // res.locals.cart is now an object based on our blueprint in cart 
 //middleware and model, and so we can call model properties on it and use it here because we make it available in app.js


res.status(201).json({
    message:'Cart updated!',
    newTotalItems: cart.totalQuantity
});

}

function updatedCartItem(req,res) {
const cart = res.locals.cart;


const updatedItemData = cart.updateItem(req.body.productId, +req.body.quantity)//+ stands for turning it into a number
;//productId and newQuantity values

req.session.cart = cart;//this updaateCartItem action is invoked by ajax reqs from inside js


res.json({
    message:'Item updated!',
    updatedCartData: {
        newTotalQuantity: cart.totalQuantity,
        newTotalPrice: cart.totalPrice,
        updatedItemPrice: updatedItemData.updatedItemPrice//because this is what we return in the function, we can access it
    }
})
}
module.exports = {
    addCartItem:addCartItem,
    getCart:getCart,
    updatedCartItem:updatedCartItem
}