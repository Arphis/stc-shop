const expressSession = require('express-session');//we must require 3rd party packages on every page if we wanna use them

const mongoDbStore = require('connect-mongodb-session');

function createSessionStore() {
    const MongoDBStore = mongoDbStore(expressSession);//by connecting session with database session we create a constructor function

    const store = new MongoDBStore({
        uri:'mongodb+srv://kirillarphis:PpEafjlKvS7C3LQA@cluster0.rybz8nm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
        databaseName: 'online-shop',
        collection:'sessions'
    });
    return store
}

function createSessionConfig() {
    return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false,//only save the session to database if it's really changed
        store: createSessionStore(expressSession),
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000//miliseconds = 2days
        }
    };
}

module.exports = createSessionConfig;
