const User = require('../models/user')
const authUtil = require('../util/authentication')
const validation = require('../util/validation')
const sessionFlash = require('../util/session-flash')

function getSignup(req,res) {
    let sessionData = sessionFlash.getSessionData(req);
//Here we have our default data if we havent flashed any data to session
    if(!sessionData) {
        sessionData = {//if we don't have any session data since we didn't signup, we create cleared properties
            email:'',
            password:'',
            postal:'',
            street:'',
            city:'',
            confirmEmail:'',
            fullname:'',
        }
    }

res.render('customer/auth/signup', {inputData:sessionData});//if we have flashed the data on the session before, render it with the page
}


function getLogin (req,res) {
let sessionData = sessionFlash.getSessionData(req);
if(!sessionData) {
sessionData = {
    email:'',
    password:''
}
}

res.render('customer/auth/login', {inputData:sessionData})
}



async function signup (req, res, next) {

    const enteredData = {email: req.body.email,
        password: req.body.password, 
        postal: req.body.postal,
    city: req.body.city, 
    fullname: req.body.fullname, 
    street: req.body.street}

if(!validation.userDetailsAreValid(req.body.email, req.body.password, req.body.postal,
     req.body.city, req.body.fullname, req.body.street)
      || !validation.emailIsConfirmed(req.body.email, req.body['confirm-email']) )
     
     { sessionFlash.flashDataToSession(req, {
        errorMessage:'Please check your input. Password must be at least 6 characters long!',
     ...enteredData
     },  //using spread op in an object to pass all the properties as params
     function() {
        res.redirect('/signup')
     })
   
    return;
}


const user = new User(req.body.email, 
    req.body.password,  
    req.body.fullname, 
    req.body.street,req.body.postal, req.body.city);



try {
    const existsAlready = await user.existsAlready();
if(existsAlready) {
    sessionFlash.flashDataToSession(req, {
        errorMessage:'User exists already! Try logging in instead!',
        ...enteredData
    }, function() {
        res.redirect('/signup')
    })
   
    return;
}


    await user.signup();//its a method here created in models
}

catch(error) {//error is default error handling middleware in express that we pass through our custom error handler
next(error);
return
}
res.redirect('/login');
}

async function login (req,res, next) {
    let existingUser
    const user = new User(req.body.email, req.body.password)
    try {
       existingUser = await user.getUserWithSameEmail();
    }
    catch (error) {
        next(error);
        return;
    }
 

 const enteredData = {email: req.body.email,
    password: req.body.password, 
    postal: req.body.postal,
city: req.body.city, 
fullname: req.body.fullname, 
street: req.body.street}
 
 const sessionErrorData =   {
    errorMessage:'Invalid credentials! Please Check your email and password!',
    ...enteredData
}

 if(!existingUser) {
    sessionFlash.flashDataToSession(req, sessionErrorData, function() {
        res.redirect('/login');
    })
    
    return;
 }

const passwordIsCorrect = await user.comparePassword(existingUser.password)//so we compare the entered pass with the password we got from the user that is in the database




if(!passwordIsCorrect) {  
      sessionFlash.flashDataToSession(req, sessionErrorData, function() {
    res.redirect('/login');
    
})
return;
}

authUtil.createUserSession(req, existingUser, function() {//we access user._id and store the id in session which we make available as a global variable via res.locals in authentication util folder
    res.redirect('/');
})//the req object is the req object in login function which holds the http request data that we pass along here

}

function logout (req,res) {
    authUtil.destroyUserSession(req);
    res.redirect('/login')
}
module.exports = {
    getSignup:getSignup,
    getLogin:getLogin,
    signup:signup,
    login:login,
    logout:logout

}