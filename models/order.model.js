const db = require('../data/database')
const mongodb = require('mongodb')



class Order {
    constructor(cart, userData, status = 'pending', date, orderId){
        this.productData = cart;//can access properties of the cart via productData. its a cart for which the order was placed
        this.userData = userData;
        this.status = status;
        this.date = new Date(date);
        if(this.date ) {
            this.formattedDate = this.date.toLocaleDateString('en-US', {
                weekday:'short',
                day:'numeric',
                month:'long',
                year:'numeric'
            });//object with configs for localeString
        }
        this.id = orderId;
    }
    //userdata contains email, id etc

    static transformOrderDocument(orderDoc) {//based on this blueprint 
        return new Order(
          orderDoc.productData,
          orderDoc.userData,
          orderDoc.status,
          orderDoc.date,
          orderDoc._id
        );
      }
    
      static transformOrderDocuments(orderDocs) {
        return orderDocs.map(this.transformOrderDocument);//get the order documents from database and transform to objects
      }
    
      static async findAll() {
        const orders = await db
          .getDb()
          .collection('orders')
          .find()
          .sort({ _id: -1 })
          .toArray();
    
        return this.transformOrderDocuments(orders);
      }
    
      static async findAllForUser(userId) {
        const uid = new mongodb.ObjectId(userId);
    
        const orders = await db
          .getDb()
          .collection('orders')
          .find({ 'userData._id': uid })//access the document via userData
          .sort({ _id: -1 })//sort from latest to oldest
          .toArray();
    
        return this.transformOrderDocuments(orders);
      }
    
      static async findById(orderId) {//find an order with id of the class Order
        const order = await db
          .getDb()
          .collection('orders')
          .findOne({ _id: new mongodb.ObjectId(orderId) });
    
        return this.transformOrderDocument(order);
      }
    


save() {
if (this.id) {
const orderId = new mongodb.ObjectId(this.id);
return db.getDb()
.collection('orders')
.updateOne({_id:orderId},{$set:{status:this.status}})
} else {
    const orderDocument = {
        userData:this.userData,
        productData:this.productData,
        date: new Date(),
        status:this.status,
    };



    return db.getDb().collection('orders').insertOne(orderDocument)
}
}
}

module.exports = Order;