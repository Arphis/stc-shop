const db = require('../data/database')
const bcrypt = require('bcryptjs');
const MongoDB = require('mongodb');
class User { 
    constructor(email, password, fullname, postal, city, street) {
        this.email = email;//this.email refers to to-be-created object inside User
        this.password = password;
        this.fullname = fullname;
      this.address = {
        street:street,
        postalCode:postal,
        city:city
      }

    }
//this gives us the user document 
static findById(userId) {
    const uid = new MongoDB.ObjectId(userId);

   return  db.getDb().collection('users').findOne({_id:uid},{projection: {password: 0}})//dont need to extract the password 
}

getUserWithSameEmail() {
   return  db.getDb().collection('users').findOne({email: this.email})//if wefind the email in database that matches the email of this object(which is entered email) we get a match
}

async existsAlready() {
    const existingUser = await this.getUserWithSameEmail();
    if (existingUser) {
        return true;
    }
    return false;
}

   async  signup() {
const hashedPassword = await bcrypt.hash(this.password, 12);

 await db.getDb().collection('users').insertOne({
    email: this.email,
    password:hashedPassword,
    name:this.name,
    address:this.address
});
    }
comparePassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);//here, hashedPassword is just a parameter for getting the pass from user in the database
}

  }

  module.exports = User;