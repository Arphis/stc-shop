
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
 
let mongoUrl = 'mongodb+srv://kirillarphis:PpEafjlKvS7C3LQA@cluster0.rybz8nm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

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
