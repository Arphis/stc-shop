

function checkAuthStatus(req, res, next) {
    const uid = req.session.uid;//the session where we have id of a logged in user

    if(!uid) {
        return next();
    }

    res.locals.uid = uid;//make the session with logged in user available in views

   
    res.locals.isAuth = true;// we can use this in views so if existing user is authorized we show some data such as logout
    res.locals.isAdmin = req.session.isAdmin;
    next();
}
module.exports = 
   checkAuthStatus
