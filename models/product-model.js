const db = require('../data/database')
const mongodb = require('mongodb');



class Product {
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.type = productData.type;
        this.price = +productData.price;
        this.description = productData.description;
        this.image = productData.image;// the name of the image. Here we point to the names of req.body
        this.updateImageData();//here im storing all the productData that i need to store in this product class
    if (productData._id) {
        this.id = productData._id.toString(); // we can use _id because we inserted productData in the database and it gives us id property 
    }
    }

static async findById(productId) {
    let prodId;
    try {
prodId = new mongodb.ObjectId(productId)
    } catch (error) {
error.code = 404;
throw error;//in case Id doesnt lead to data in the database
    }

   const product =  await db.getDb().collection('products').findOne({_id:prodId})

   if(!product) {
    const error = new Error('Could not find product with provided Id');
    error.code = 404;
    throw error;//in case we cant find id in the database
   }

    return new Product(product);// the error here was that we need to get access to Product.id, so we need to return a property of product which will then convert _id to string
}




    static async findAll() {//static because we havent yet inserted any data in database so its a utility function that goes together with the class
const products = await db.getDb().collection('products').find().toArray();

return products.map(function(productDocument) {//.map allows us to transform an array full of product documents(in database) to an array full of product Objects based on the blueprint above, so we add our imagePath and Urlpath to dtabase as well
   //productDocument is a document for each inserted productData in the database,its a kind of built in parameter although the name is up to us
    return new Product(productDocument)//convert the object based on our class so we can transform all documents fetched from the database into objects based on our blueprint 
});//we can call map on any array
    }//map takes function as parameter and executes function for every item in array


static async sortProducts(enteredType) {//get the value from selected option

    const products = await db.getDb().collection('products').find().toArray()

   const sortedProducts =  products.filter(p => p.type === enteredType)
   return sortedProducts.map(function(productDocument) {
    return new Product(productDocument)
   })

}


static async findMultiple(ids) { 
    const productIds = ids.map(function(id) {
        return new mongodb.ObjectId(id); //transforms the array of item ids into mongodb objects
    
    })

    const products = await db.getDb()
    .collection('products')
    .find({_id: { $in: productIds  }})//find database objects id in our array of item ids and turn the document object into an array
    .toArray();

    return products.map(function (productDocument){//convert database products  array into an array of product objects based on the class blueprint
        return new Product(productDocument);
    });

}

    updateImageData() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
}


    async save() {
        const productData = {
            title:this.title,
            summary:this.summary,
            price:this.price,
            description:this.description,
            image: this.image,
            type:this.type
        }

        if (this.id) {
            const productId = new mongodb.ObjectId(this.id);//we need to have mongodb Object Id
            if (!this.image) {// in case if we update our product and we do not submit a new image, so there will be no image
                delete productData.image;//delete image key value pair so the $set wont try to update the image. We delete it only in database, not the actual image that we have in our product
            }//Note that we delete only the image of the database if we do not post an image, but the oldimage will still be in the database because we delete the keynote field as well when we update product
            //so that means that old image data will still remain untouched because we save the properties without image property
            
            await db.getDb().collection('products').updateOne({_id:productId}, { 
                $set:  productData,
                 //update all the data in the database
            });
        } else {
            await db.getDb().collection('products').insertOne(productData);
        }
    
    }

async replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }

remove () {
    const productId = new mongodb.ObjectId(this.id);
return db.getDb().collection('products').deleteOne({_id:productId });
  }
}

module.exports = Product