const path = require('path')
const express = require('express')//for packages we dont need to type route
const csrf = require('csurf');
const expressSession = require('express-session')
const createSessionConfig = require('./config/session');
const db = require('./data/database')
const cartMIddleware = require('./middleware/cart')
const addCsrfTokenMiddleWare = require('./middleware/csrf.token')
const errorHandlingMiddleware = require('./middleware/error.handler')
const checkAuthStatusMiddleware = require('./middleware/check-auth')
const authRoutes = require('./routes/auth.routes');
const updateCartPricesMiddleware = require('./middleware/update-cart-prices')
const protectRoutesMiddleware = require('./middleware/protect-routes')
const productRoutes = require('./routes/products.routes')
const baseRoutes = require('./routes/base.routes')
const cartRoutes = require('./routes/cart.routes')
const adminRoutes = require('./routes/admin.routes');
const notFoundMiddleware = require('./middleware/not-found')
const ordersRoutes = require('./routes/orders.routes');
const orderRoute = require('./routes/order.routes')





const app = express();


app.set('view engine', 'ejs')// tell express to use js for rendering views
app.set('views' , path.join(__dirname, 'views'));


app.use('/products/assets', express.static('product-data'));//only reqs that start with this route will be handled by this middleware


// app.use(express.static('public/imgs'))
app.use(express.static('public'));//use the public folder for static files so we only use /styles in html files as path
app.use(express.urlencoded({extended:false}));//handling data that comes in via the forms being submitted
app.use(express.json());


const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));//get session middleware, connect express session to our session configuration functions
app.use(csrf());


app.use(cartMIddleware)// need to add the middleware after the session
app.use(updateCartPricesMiddleware)

app.use(addCsrfTokenMiddleWare);//use csrf token method in my own middleware
app.use(checkAuthStatusMiddleware);


app.use(baseRoutes);
app.use(authRoutes); //authRoutes will be evaluated for every incoming request that matches .get and paths of the request

app.use(productRoutes);

app.use('/cart', cartRoutes)
app.use('/orders', protectRoutesMiddleware , ordersRoutes)
app.use('/admin', protectRoutesMiddleware,  adminRoutes);//only paths that start with /admin will make it in the admin routes
app.use(orderRoute)
app.use(notFoundMiddleware)//makes sure we have rendered an error page if the url is incorrect


app.use(errorHandlingMiddleware);



db.connectToDatabase().then(function ()
 {app.listen(3000)}).
 catch(function(error) 
 {// error here is generated automatically by mongodb if connection fails
console.log('Failed to connect to database');
console.log(error);
})


