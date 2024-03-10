const Order = require('../models/order.model');
const stripe = require("stripe")('sk_test_51M8l3dLG1uCZS8TnWVXzX3g0QHmYZLy7yU097RRkBfPwmKKAB3hLUyLq6dqbwvS7PvIh2LH0of9ERAOfIkRrqNDB005vGi8pSu');
const User = require('../models/user')

async function getOrders(req, res, next) {
    try {
      const orders = await Order.findAllForUser(res.locals.uid);//find orders for a user with existing Email and display em on the page
      res.render('customer/orders/all-orders', {
        orders: orders,
      });
    } catch (error) {
      next(error);
    }
  }


async function addOrder(req,res, next) {
const cart = res.locals.cart;
let userDocument 
try {
     userDocument = await User.findById(res.locals.uid);//we find the existing user document without the password
} catch (error) {
return next(error)
}

const order = new Order(cart, userDocument );
try {
    await order.save()
} catch(error) {
    next(error);
    return
}
req.session.cart = null;
//Stripe API code 
const session = await stripe.checkout.sessions.create({
   payment_method_types:['card'],
   //Transform items in cart to items that follow the stripe strucure below and change all the values to the values of our cart items
    line_items: cart.items.map(function(item) {
        return  {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price_data: {
                currency:'usd',
                product_data:{
                    name:item.product.title
                },
                unit_amount:+item.product.price.toFixed(2) * 100 //trim the decimals in price via toFixed, multiple by 100 to get cents price which is what stripe needs
        },//describe the price just in time for the specific transaction without the data being stored on stripes servers
            quantity: item.quantity,
          }
    } ) ,
    mode: 'payment',
    success_url: `http://localhost:3000/order/success`,
    cancel_url: `http://localhost:3000/order/failure`,
  });

  res.redirect(303, session.url);
}


function getSuccess(req,res) {
    res.render('customer/orders/success')
}

function getFailure(req,res) {
    res.render('customer/orders/failure')
}

module.exports = {
    addOrder:addOrder,
    getOrders:getOrders,
    getSuccess:getSuccess,
    getFailure:getFailure
}