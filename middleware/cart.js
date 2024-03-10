const Cart = require('../models/cart-model')

function initializeCart(req, res, next) {
    let cart;
// so that we can add cart property to session
    if(!req.session.cart) {
cart = new Cart();
    } else {
        cart = new Cart(req.session.cart.items, req.session.cart.totalQuantity, req.session.cart.totalPrice);//we  have items property in our constructor via this.items
    }


    res.locals.cart = cart;//we make our new object in session available for all the middleware functions and views via res.locals
next()//travel to next middleware

}

module.exports = initializeCart;