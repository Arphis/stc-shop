function addCsrfToken(req,res,next){
    res.locals.csrfToken = req.csrfToken();//set variables that are exposed to all views automatically
//csrfToen is available via middleware
next()//the request for which the middleware is executed will reach the next middleware
}

module.exports = addCsrfToken;