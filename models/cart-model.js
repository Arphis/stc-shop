
const Product = require('./product-model');


class Cart {
    constructor(items = [], totalQuantity = 0, totalPrice = 0) {//empty array if no items
        this.items = items;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;

    }
    async updatePrices() {
        const productIds = this.items.map(function (item) {
          return item.product.id;//this returns an array of id properties of each item
        });
    
        const products = await Product.findMultiple(productIds);//returns products with ids of cart items 
    
        const deletableCartItemProductIds = [];
    
        for (const cartItem of this.items) {
          const product = products.find(function (prod) {
            return prod.id === cartItem.product.id;//id of each item of products is equal to item ids we have in the cart
          });//returns products that exist in a cart
    
          if (!product) {
            // product was deleted!
            // "schedule" for removal from cart
            deletableCartItemProductIds.push(cartItem.product.id);
            continue;
          }
    
          // product was not deleted
          // set product data and total price to latest price from database
          cartItem.product = product;
          cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
        }
    
        if (deletableCartItemProductIds.length > 0) {
          this.items = this.items.filter(function (item) {
            return deletableCartItemProductIds.indexOf(item.product.id) < 0;//this is a condition:if we couldn't find an item filter returns true if the condition is met
          });//if this item was not deleted because we dont have it in an array od delete...
        }//these items should be kept since then filter returns true, otherwise it returns false 
    
        // re-calculate cart totals
        this.totalQuantity = 0;
        this.totalPrice = 0;
    
        for (const item of this.items) {
          this.totalQuantity = this.totalQuantity + item.quantity;//adding price and quantities for remaining items
          this.totalPrice = this.totalPrice + item.totalPrice;
        }
      }


    addItem(product) {//treat this as a plus symbol when we add the quantaty of each product and add product

        const cartItem = {//quantity is set to one in case we push a new item, then its one in the cart
            product:product,
            quantity: 1,
            totalPrice: product.price
        }
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
        
    
        if (item.product.id === product.id) {//the id of the item added is equal to the id of product that we pass to addItem, so if its the same item we add
cartItem.quantity = item.quantity + 1;//initially when creating new Cart() we don't have any parameters, so item doesn't have a quantity and then we add 1 and store it to cart so then we have 1 item
cartItem.totalPrice = item.totalPrice + product.price;
this.items[i] = cartItem;

this.totalQuantity++;//the total quantity of all different items in the cart
this.totalPrice = this.totalPrice + product.price;
return;// return because we already did add product by updating the existing item
        }
    }


    this.items.push(cartItem)
    this.totalQuantity++
    this.totalPrice += product.price;
    }

    updateItem(productId, newQuantity) {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
        
    
        if (item.product.id === productId && newQuantity>0) {
        
            const cartItem = {...item};//the copy of existing item in the cart
           const quantityChange = newQuantity - item.quantity;//updated quantity minus our existing item quantity
           
            cartItem.quantity = newQuantity;
            cartItem.totalPrice = newQuantity * item.product.price;//update the price of added items with same id
            this.items[i] = cartItem;

            this.totalQuantity=this.totalQuantity + quantityChange;//this is why we need the quantityChange const
            this.totalPrice += quantityChange * item.product.price;//we need quantityChange instead of newQuantity because we don't need to add the updated quantity price to old quantity price, we need to update it
            return {updatedItemPrice:  cartItem.totalPrice};
} else if (item.product.id === productId && newQuantity <=0) {
    this.items.splice(i, 1);// index and number of items that should be removed
    this.totalQuantity=this.totalQuantity - item.quantity;//this item[i] still exists in the variable even though we removed it from items in our constructor
    this.totalPrice -= item.totalPrice;//the totalPrice is obviously for all of the quantity of products
    return {updatedItemPrice:  0};
}
        }
    
    }
    } 

    module.exports = Cart;