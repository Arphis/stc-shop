
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
 
let mongoUrl = 'mongodb://127.0.0.1:27017'

if (process.env.MONGODB_URL) {
     mongoUrl = process.env.MONGODB_URL
}//look for envirounment var via node js API

let database ;

async function connectToDatabase () {
    const client = await MongoClient.connect(mongoUrl);
    database = client.db('online-shop');
}


function getDb() {
    if(!database) {
        throw new Error('You must connect to database first!')//here error is a class that is built in js
    }

    return database
}

module.exports = {
    connectToDatabase:connectToDatabase,
    getDb:getDb
}