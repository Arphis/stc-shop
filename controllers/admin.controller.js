const Product = require('../models/product-model')
const Order = require('../models/order.model');


async function getProducts(req, res, next) {
    try {
        const products = await Product.findAll();
        res.render('admin/products/all-products', {products:products});//so now we can render products array that we inserted into database
    } catch (error) {
        next(error);
        return;
    }

    }



function getNewProduct(req, res) {
    res.render('admin/products/new-product')
}

async function createNewProduct(req, res, next) {
    console.log(req.body);
    console.log(req.file);
const product = new Product({
    ...req.body,//paste the body properties with POST method, constructor is an object
    image:req.file.filename,
    type:req.body.type

    
    //also paste image filename property which is part of .file method
})
//Here, req.body is an object which we paste and then devide into fields in our product-model class.
// but image: is not an object, it is a fiel which is a part of the object which we paste, therefore
// we access it via productData.image in class, but the ...req.body an object,
// so we still need to use productData. to access its' individal fields
//in other words, another way to write it would be  description: req.body.description etc.

try {
    await product.save();
} catch (error) {
        next(error);
        return;
    }


    res.redirect('/admin/products/')//here we use/admin because we use the path that we have in routes, the URL path and its what we have in the get route = /admin/products which renders the html page
}

async function getUpdateProduct (req, res, next) {
   try {
    const product = await Product.findById(req.params.id)
    res.render('admin/products/product-update', {product:product})
   } catch (error) {
    next(error);
   }
}

async function updateProduct (req, res, next) {
    const product = new Product({
        ...req.body,
        _id: req.params.id
    });

    if(req.file) {//if the user chose a new image when updating
        product.replaceImage(req.file.filename);
    }

try {
    await product.save();
}
 catch (error) {
    next(error);
    return;
 }

res.redirect('/admin/products')
}

async function deleteProduct (req, res, next) {
   let product 
    try {
         product = await Product.findById(req.params.id);
         await product.remove();
    } catch (error) {
        return next(error)
    }
//res.redirect('/admin/products') - doesnt work since we run a front-end js code for this and the page doesnt reload for those
res.json({message:'Deleted product!'})//response with data
}

async function getOrders(req, res, next) {
    try {
      const orders = await Order.findAll();
      res.render('admin/orders/admin-orders', {
        orders: orders
      });
    } catch (error) {
      next(error);
    }
  }
  
  async function updateOrder(req, res, next) {
    const orderId = req.params.id;
    const newStatus = req.body.newStatus;
  
    try {
      const order = await Order.findById(orderId);
  
      order.status = newStatus;
  
      await order.save();//we will update the existing order because this.id exists
  
      res.json({ message: 'Order updated', newStatus: newStatus });//res.json() us needed to trigger this function with ajax request
    } catch (error) {
      next(error);
    }
  }
module.exports = {
    getProducts:getProducts,
    getNewProduct:getNewProduct,
    createNewProduct:createNewProduct,
    getUpdateProduct:getUpdateProduct,
    updateProduct:updateProduct,
    deleteProduct: deleteProduct,
    getOrders:getOrders,
    updateOrder:updateOrder
}